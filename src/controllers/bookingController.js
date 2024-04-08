const { Booking } = require("../models");

const bookingController = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({ include: ["author"], order: [['created_at', 'ASC']] });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  getBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findByPk(bookingId);
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  createBooking: async (req, res) => {
    try {
      const { start_date, duration, nb_people, hotel, total, user_id } =
        req.body;
      if (!start_date) {
        res.status(400).json({ message: "Veuillez définir une date d'arrivée" });
      } else if (duration === 1 && hotel) {
        res
          .status(400)
          .json({
            message: "Vous ne pouvez pas réserver pour 1 jour avec hotel",
          });
      } else {
        const newBooking = await Booking.build({
          start_date,
          duration,
          nb_people,
          hotel,
          total,
          user_id,
        });
        await newBooking.save();
        res
          .status(200)
          .json({ newBooking, message: "La réservation a bien été éffectuée" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { start_date, duration, nb_people, hotel, total, user_id, closed } =
        req.body;

        const booking = await Booking.findByPk(bookingId);

        if (start_date) {
        booking.start_date = start_date;
      }
      if (duration) {
        booking.duration = duration;
      }
      if (nb_people) {
        booking.nb_people = nb_people;
      }
      if (hotel) {
        booking.hotel = hotel;
      }
      if (total) {
        booking.total = total;
      }
      if (user_id) {
        booking.user_id = user_id;
      }
      if (closed !== undefined) {
        booking.closed = closed;
      }

      if (duration === 1 && hotel) {
        res
          .status(400)
          .json({
            message: "Vous ne pouvez pas réserver pour 1 jour avec hotel",
          });
      }
      await booking.save();
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findByPk(bookingId);

      await booking.destroy();
      res.status(200).json("La réservation a bien été supprimée");
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
};

module.exports = bookingController;
