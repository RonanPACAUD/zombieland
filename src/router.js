const { Router } = require("express");
const path = require('path'); 

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const messageController = require("./controllers/messageController");
const bookingController = require("./controllers/bookingController");
const categoryController = require("./controllers/categoryController");
const tagController = require("./controllers/tagController");
const priceController = require("./controllers/priceController");
const attractionController = require("./controllers/attractionController");
const authMiddleware = require("./middlewares/authMiddleware");
const pictureController = require("./controllers/pictureController");

const router = Router();

router.use((req, res, next) => {
    let filePath = path.join(__dirname, '../Front/dist/index.html')
    res.sendFile(filePath)
});

// User Routes
router.get("/user", authMiddleware.checkToken, userController.getAllUsers);
router.get("/user/:id", authMiddleware.checkToken, userController.getUser);
router.patch("/user/:id", authMiddleware.checkToken, authMiddleware.checkRole, userController.updateUser);
router.delete("/user/:id", authMiddleware.checkToken, authMiddleware.checkRole, userController.deleteUser);

// Authentification Routes
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.patch("/reset", authMiddleware.checkToken, authController.resetPassword);

// Message Routes
router.get("/message", authMiddleware.checkToken, authMiddleware.checkRole, messageController.getAllMessages);
router.get("/message/:id", authMiddleware.checkToken, authMiddleware.checkRole,  messageController.getMessage);
router.post("/message", messageController.createMessage);
router.patch("/message/:id", authMiddleware.checkToken, authMiddleware.checkRole, messageController.updateMessage);
router.delete("/message/:id", authMiddleware.checkToken, authMiddleware.checkRole, messageController.deleteMessage);

// Booking Routes
router.get("/booking", authMiddleware.checkToken, authMiddleware.checkRole, bookingController.getAllBookings);
router.get("/booking/:id", authMiddleware.checkToken,bookingController.getBooking);
router.post("/booking", authMiddleware.checkToken, bookingController.createBooking);
router.patch("/booking/:id", authMiddleware.checkToken, authMiddleware.checkRole, bookingController.updateBooking);
router.delete("/booking/:id", authMiddleware.checkToken, bookingController.deleteBooking);

// Attraction Routes
router.get("/attraction", attractionController.getAllAttraction);
router.get("/attraction-filter/:category_id?/:tag_search?", attractionController.getFilterAttraction);
router.get("/attraction/:id", attractionController.getAttraction);
router.post("/attraction", authMiddleware.checkToken, authMiddleware.checkRole, attractionController.createAttraction);
router.patch("/attraction/:id", authMiddleware.checkToken, authMiddleware.checkRole, attractionController.updateAttraction);
router.delete("/attraction/:id", authMiddleware.checkToken, authMiddleware.checkRole, attractionController.deleteAttraction);

// Category Routes
router.get("/category", categoryController.getAllCategories);
router.post("/category", authMiddleware.checkToken, authMiddleware.checkRole, categoryController.createCategory);
router.delete("/category/:id", authMiddleware.checkToken, authMiddleware.checkRole, categoryController.deleteCategory);

// Tag Routes
router.get("/tag", tagController.getAllTags);
router.post("/tag", authMiddleware.checkToken, authMiddleware.checkRole, tagController.createTag);
router.delete("/tag/:id", authMiddleware.checkToken, authMiddleware.checkRole, tagController.deleteTag);

// Tag association Routes
router.post("/attraction/:attraction_id/tag/:tag_id", authMiddleware.checkToken, authMiddleware.checkRole, tagController.associateTagToAttraction);
router.delete("/attraction/:attraction_id/tag/:tag_id", authMiddleware.checkToken, authMiddleware.checkRole, tagController.removeTagFromAttraction);

// Price Routes
router.get("/price", priceController.getAllPrice);
router.post("/price", authMiddleware.checkToken, authMiddleware.checkRole, priceController.createPrice);
router.delete("/price/:id", authMiddleware.checkToken, authMiddleware.checkRole, priceController.deletePrice);

// Picture Routes
router.get("/picture", pictureController.getAllPictures);
router.post('/picture', authMiddleware.checkToken, authMiddleware.checkRole, pictureController.addPicture);
router.delete('/picture/:id', authMiddleware.checkToken, authMiddleware.checkRole, pictureController.deletePicture);


module.exports = router;