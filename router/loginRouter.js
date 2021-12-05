// external imports

const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

// set page title
const page_title = "Login";

// login page
router.get("/", decorateHTMLResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHTMLResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

router.delete("/", logout);

module.exports = router;
