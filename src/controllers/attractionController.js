const { Tag } = require("../models");
const { Attraction } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const attractionController = {
  getAllAttraction: async (req, res) => {
    try {
      const attractions = await Attraction.findAll({
        include: ["pictures", "category", "tags"],
        order: [["id", "ASC"]],
      });
      res.status(200).json(attractions);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  getFilterAttraction: async (req, res) => {
    try {
      let { category_id, tag_search } = req.query;

      if (!tag_search) {
        tag_search = "";
      }

      const filterAttractions = await Attraction.findAll({
        where: !isNaN(category_id) ? { category_id: category_id } : null,
        include: [
          "pictures",
          "category",
          {
            association: "tags",
            where: { name: { [Op.iLike]: "%" + tag_search + "%" } },
          },
        ],
        order: [["id", "ASC"]],
      });

      res.status(200).json(filterAttractions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  getAttraction: async (req, res) => {
    try {
      const attractionId = req.params.id;
      const attraction = await Attraction.findByPk(attractionId, {
        include: ["pictures", "category", "tags"],
      });
      res.status(200).json(attraction);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  createAttraction: async (req, res) => {
    try {
      const { name, description, category_id } = req.body;

      if (!name) {
        res.status(400).json({ message: "Veuillez définir un nom" });
      } else if (!description) {
        res.status(400).json({ message: "Veuillez donner une description" });
      } else if (!category_id) {
        res
          .status(400)
          .json({ message: "Veuillez sélectionner une categorie" });
      } else {
        const newAttraction = await Attraction.build({
          name,
          description,
          category_id,
        });
        await newAttraction.save();
        res
          .status(200)
          .json({ newAttraction, message: "L'attraction à bien été créée" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  updateAttraction: async (req, res) => {
    try {
      const attractionId = req.params.id;
      const { name, description, category_id } = req.body;
      const attraction = await Attraction.findByPk(attractionId);
      if (name) {
        attraction.name = name;
      }
      if (description) {
        attraction.description = description;
      }
      if (category_id) {
        attraction.category_id = category_id;
      }
      await attraction.save();
      res.status(200).json(attraction);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  deleteAttraction: async (req, res) => {
    try {
      const attractionId = req.params.id;
      console.log(attractionId);
      const attraction = await Attraction.findByPk(attractionId, {
        include: ["pictures", "category", "tags"],
      });

      if (attraction.tags.length > 0) {
        attraction.tags.map(async (tag) => {
          await attraction.removeTag(tag);
        });
      }

      await attraction.destroy();
      res.status(200).json({ message: "L'attraction a est bien été supprimé" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

module.exports = attractionController;
