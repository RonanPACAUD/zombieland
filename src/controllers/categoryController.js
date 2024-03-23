const { Category } = require("../models");

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = await Category.build({ name });
            await newCategory.save();
            res.status(200).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const category = await Category.findByPk(categoryId);
            await category.destroy();
            res.status(200).json("La categorie a bien été supprimé");
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    }
};

module.exports = categoryController;