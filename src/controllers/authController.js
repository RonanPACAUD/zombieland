const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
var validator = require("validator");
const bcrypt = require("bcryptjs");

const authController = {
  signUp: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        address,
        city,
        country,
        email,
        password,
        confirm_password,
        role,
      } = req.body;

      // Vérification de l'éxistence de l'utilisateur
      const existingUser = await User.findOne({ where: { email } });

      // Vérification du prénom
      if (!first_name) {
        res.status(400).json({ message: "Veuillez renseigner un prénom." });
      } else if (!validator.isAlpha(first_name, "fr-FR", { ignore: " -" })) {
        res
          .status(400)
          .json({ message: "Le prénom ne doit contenir que des lettres." });
        // Vérification du nom
      } else if (!last_name) {
        res.status(400).json({ message: "Veuillez renseigner un nom." });
      } else if (!validator.isAlpha(last_name, "fr-FR", { ignore: " -" })) {
        res
          .status(400)
          .json({ message: "Le nom ne doit contenir que des lettres." });
        // Vérification de l'email
      } else if (!email) {
        res.status(400).json({ message: "Veuillez renseigner un email." });
      } else if (!validator.isEmail(email)) {
        res
          .status(400)
          .json({ message: "Veuillez renseigner un email valide" });
      } else if (existingUser) {
        res
          .status(400)
          .json({ message: "Un compte existe déja avec cet email" });
        // Vérification de l'adresse
      } else if (!address) {
        res.status(400).json({ message: "Veuillez renseigner une adresse." });
        // Vérification de la ville
      } else if (!city) {
        res.status(400).json({ message: "Veuillez renseigner une ville." });
      } else if (!validator.isAlpha(city, "fr-FR", { ignore: " -" })) {
        res
          .status(400)
          .json({ message: "La ville ne doit contenir que des lettres." });
        // Vérification du pays
      } else if (!country) {
        res.status(400).json({ message: "Veuillez renseigner un pays." });
      } else if (!validator.isAlpha(country, "fr-FR", { ignore: " -" })) {
        res
          .status(400)
          .json({ message: "Le pays ne doit contenir que des lettres." });
        // Vérification du mot de passe
      } else if (!password) {
        res
          .status(400)
          .json({ message: "Veuillez renseigner un mot de passe." });
      } else if (!validator.isStrongPassword(password)) {
        res.status(400).json({
          message:
            "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 nombre et 1 symbole",
        });
      } else if (password !== confirm_password) {
        res
          .status(400)
          .json({ message: "Les mots de passe ne correspondent pas" });
      } else {
        // Hashage du MDP
        const saltRounds = Number(process.env.SALT_ROUND);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.build({
          first_name,
          last_name,
          address,
          city,
          country,
          email,
          password: hashedPassword,
          role,
        });
        await newUser.save();
        res.status(200).json({
          newUser,
          message: "Inscription réussie. Bienvenue à ZombieLand",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res
          .status(401)
          .json({ message: "Veuillez renseigner un email." });
      } else if (!password) {
        return res
          .status(401)
          .json({ message: "Veuillez renseigner un mot de passe." });
      }
      const user = await User.findOne({
        where: { email },
        include: ["bookings"],
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Aucun utilisateur pour cet email." });
      }
      const isMatchingPassword = await bcrypt.compare(password, user.password);

      if (!isMatchingPassword) {
        res.status(401).json({ message: "Le mot de passe ne correspond pas." });
      } else {
        const userSafe = { ...user.dataValues };
        delete userSafe.password;
        const token = authMiddleware.createToken(userSafe.id, userSafe.role);
        res
          .status(200)
          .json({ userSafe, token, message: "Authentificaiton réussie" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, password, new_password, confirm_password } = req.body;

      console.log(req.body);

      if (!password) {
        return res
          .status(400)
          .json({ message: "Veuillez renseigner un mot de passe." });
      }

      const user = await User.findOne({
        where: { email },
        include: ["bookings"],
      });

      const isMatchingPassword = await bcrypt.compare(password, user.password);

      if (!isMatchingPassword) {
        res.status(400).json({ message: "Mauvais mot de passe" });
      } else if (!new_password) {
        res
          .status(400)
          .json({ message: "Veuillez renseigner un nouveau mot de passe." });
      } else if (!confirm_password) {
        res
          .status(400)
          .json({ message: "Veuillez confirmer le nouveau mot de passe." });
      } else if (!validator.isStrongPassword(password)) {
        res.status(400).json({
          message:
            "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 nombre et 1 symbol",
        });
      } else if (new_password !== confirm_password) {
        res
          .status(400)
          .json({ message: "Les mots de passe ne correspondent pas" });
      } else {
        const saltRounds = Number(process.env.SALT_ROUND);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        await User.update(
            { password: hashedPassword },
            { where: { email: email } }
        );

        res.status(200).json({
          message: "Mot de passe modifié.",
        });
      }
      console.log(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

module.exports = authController;
