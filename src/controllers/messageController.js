const Message = require("../models/Message");

const messageController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.findAll({ include: ["sender"], order: [['created_at', 'ASC']] });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  getMessage: async (req, res) => {
    try {
      const messageId = req.params.id;
      const message = await Message.findByPk(messageId);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  createMessage: async (req, res) => {
    try {

      console.log(req.body)

      const { subject, content, sender_id } = req.body;
      if (!subject) {
        res.status(400).json({ message: "Veuillez remplir le champs objet" });
      } else if (!content) {
        res.status(400).json({ message: "Veuillez remplir la zone de texte" });
      } else {
        const newMessage = await Message.build({
          subject,
          content,
          sender_id,
        });
        await newMessage.save();
        res
          .status(200)
          .json({ newMessage, message: "Le message a bien été envoyé" });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  updateMessage: async (req, res) => {
    try {
      const messageId = req.params.id;
      const { subject, content, sender_id, closed } = req.body;
      const message = await Message.findByPk(messageId);
      if (subject) {
        message.subject = subject;
      }
      if (content) {
        message.content = content;
      }
      if (sender_id) {
        message.sender_id = sender_id;
      }
      if (receiver_id) {
        message.receiver_id = receiver_id;
      }
      if (closed !== undefined) {
        message.closed = closed;
      }
      await message.save();
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const messageId = req.params.id;
      const message = await Message.findByPk(messageId);
      await message.destroy();
      res.status(200).json("Le message a bien été supprimé");
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

module.exports = messageController;
