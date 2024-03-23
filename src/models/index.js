const Attraction = require("./Attraction");
const Booking = require("./Booking");
const Category = require("./Category");
const Message = require("./Message");
const Picture = require("./Picture");
const Tag = require("./Tag");
const User = require("./User");

// User <-> Booking

User.hasMany(Booking, {
    foreignKey: "user_id",
    as: "bookings"
});

Booking.belongsTo(User, {
    foreignKey: "user_id",
    as: "author"
});

// User <-> Message

User.hasMany(Message, {
    foreignKey: "sender_id",
    as: "messages_sent"
});

Message.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender"
})

User.hasMany(Message, {
    foreignKey: "receiver_id",
    as: "messages_received"
});

Message.belongsTo(User, {
    foreignKey: "receiver_id",
    as: "receiver"
})

// Attraction <-> Category

Category.hasMany(Attraction, {
    foreignKey: "category_id",
    as: "attractions"
});

Attraction.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category"
});

// Attraction <-> Picture

Attraction.hasMany(Picture, {
    foreignKey: "attraction_id",
    as: "pictures"
});

Picture.belongsTo(Attraction, {
    foreignKey: "attraction_id",
    as: "attraction"
});

// Attraction <-> Tag

Attraction.belongsToMany(Tag, {
    through: "attraction_has_tag",
    foreignKey: "attraction_id",
    otherKey: "tag_id",
    as: "tags"
});

Tag.belongsToMany(Attraction, {
    through: "attraction_has_tag",
    foreignKey: "tag_id",
    otherKey: "attraction_id",
    as: "attractions"
});

module.exports = { Attraction, Booking, Category, Picture, Tag, User};