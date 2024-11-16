const { Tag, Attraction } = require("../models");

const tagController= {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.status(200).json(tags)
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    createTag: async (req, res) => {
        try {
            const { name } = req.body;
            const newTag = await Tag.build({ name });
            await newTag.save();
            res.status(200).json(newTag);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tag = await Tag.findByPk(tagId);
            await tag.destroy();
            res.status(200).json({ message: "Le tag a bien été supprimé"});
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    associateTagToAttraction: async (req,res) => {
        try {
            const { attraction_id, tag_id } = req.params;

            const attraction = await Attraction.findByPk(attraction_id);
            const tag = await Tag.findByPk(tag_id);

            await attraction.addTag(tag);
            const associateAttraction = await Attraction.findByPk(attraction_id, {include: ['tags']});

            res.status(200).json(associateAttraction);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },

    removeTagFromAttraction: async (req, res) => {
        try {
            const { attraction_id, tag_id } = req.params;

            const tag = await Tag.findByPk(tag_id);
            const attraction = await Attraction.findByPk(attraction_id);
            
            console.log(tag)
            console.log(attraction)

            await attraction.removeTag(tag);
            const disassociateAttraction = await Attraction.findByPk(attraction_id, {include: 'tags'});

            res.status(200).json(disassociateAttraction);
        } catch (error) {
            res.status(500).json({ message: 'Erreur interne du serveur'});
        }
    },
};

module.exports = tagController;