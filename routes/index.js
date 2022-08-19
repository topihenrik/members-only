const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express', user: req.user});
});

router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);

router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);

router.get("/logout", user_controller.logout_get);

module.exports = router;
