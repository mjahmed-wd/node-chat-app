const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name field is required")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Email field is required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile field is required")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password").isStrongPassword().withMessage("Password is weak"),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (object.keys(mappedErrors).length > 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { fileName } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${fileName}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedErrors
    })
  }
};

module.exports = { addUserValidators, addUserValidationHandler };
