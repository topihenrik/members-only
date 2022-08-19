const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", message_controller.home_get);


// USER ROUTES
router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);
router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);
router.get("/logout", user_controller.logout_get);
router.get("/joinclub", user_controller.joinclub_get);
router.post("/joinclub", user_controller.joinclub_post);

// MESSAGE ROUTES
router.get("/new_message", message_controller.new_message_get);
router.post("/new_message", message_controller.new_message_post);
router.post("/del_message", message_controller.del_message_post);


module.exports = router;
