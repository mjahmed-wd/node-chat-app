// external imports

const express = require("express");

// internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// inbox page
router.get("/",decorateHTMLResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
