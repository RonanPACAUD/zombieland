const Price = require("../models/Price");

const priceController = {
    getAllPrice: async (req, res) => {
        try {
            const prices = await Price.findAll({order: [['hotel', 'ASC'], ['duration', 'ASC']]});
            res.status(200).json(prices);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    createPrice: async (req, res) => {
        try {
            const { hotel, duration, price } = req.body;
            const newPrice = await Price.build({ hotel, duration, price});
            await newPrice.save();
            res.status(200).json(newPrice);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    deletePrice: async (req, res) => {
        try {
            const priceId = req.params.id;
            const tag = await Price.findByPk(priceId);
            await tag.destroy();
            res.status(200).json("Le prix a bien été supprimé");
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    }
};



module.exports = priceController;