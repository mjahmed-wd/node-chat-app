// external imports

const express = require("express");
const { check } = require("express-validator");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// user page
router.get("/", decorateHTMLResponse("Users"), checkLogin, getUsers);

// add user page
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
