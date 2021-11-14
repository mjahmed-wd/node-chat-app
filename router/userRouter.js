// external imports

const express = require("express");

// internal imports
const { getUsers } = require("../controller/userController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");

const router = express.Router();

// user page
router.get("/", decorateHTMLResponse("Users"), getUsers);

module.exports = router;
