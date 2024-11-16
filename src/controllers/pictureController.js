const { Picture } = require("../models");

const pictureController = {
  getAllPictures: async (req, res) => {
    try {
      const pictures = await Picture.findAll();
      res.status(200).json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  addPicture: async (req, res) => {
    try {
      const { pictures_url, attraction_id } = req.body;

      const newPicture = await Picture.build({ pictures_url, attraction_id });
      await newPicture.save();
      res.status(200).json(newPicture);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  deletePicture: async (req, res) => {
    try {
      const pictureId = req.params.id;
      console.log(pictureId)
      const picture = await Picture.findByPk(pictureId);
      await picture.destroy();
      res.status(200).json("La photo a bien été supprimé");
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

module.exports = pictureController;
