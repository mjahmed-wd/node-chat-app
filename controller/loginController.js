const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

// do login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          role: "user",
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRES_IN,
          httpOnly: true,
          signed: true,
        });

        //   set logged in user in local identifier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again");
      }
    } else {
      throw createError("Login failed! Please try again");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};