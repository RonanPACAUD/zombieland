const User = require("../models/User");


const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({order: [['created_at', 'ASC']]});
            res.status(200).json(users); 
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    getUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {include: ["bookings"],});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { first_name, last_name, address, city, country, email, password } = req.body;
            const user = await User.findByPk(userId);
            if (first_name) { user.first_name = first_name };
            if (last_name) { user.last_name = last_name };
            if (address) { user.address = address };
            if (city) { user.city = city};
            if (country) { user.country = country };
            if (email) { user.email = email };
            if (password) { user.password = password };
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId)
            await user.destroy();
            res.status(200).json("L'element est bien supprimé");
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }
};

module.exports = userController;