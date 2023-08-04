const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

let User = require("../models/user");

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {

    await check("name", "Name is required").notEmpty().run(req);
    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);
    await check("confirm_password", "Confirm password is required")
      .notEmpty()
      .run(req);
    await check(
      "confirm_password",
      "Password and confirm password do not match"
    )
      .equals(req.body.password)
      .run(req);

   
    const errors = validationResult(req);

    if (errors.isEmpty()) {

      let newUser = new User();

      newUser.name = req.body.name;
      newUser.email = req.body.email;

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hashed_password) {
          if (err) {
            console.log(err);
          } else {
            newUser.password = hashed_password;
            let result = await newUser.save()
            if (!result) {
              res.send("Could not save user")
            } else {
              res.redirect("/users/login");
            }
          }
        });
      });
    } else {
      res.render("register", {
        errors: errors.array(),
      });
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res, next) => {
    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureMessage: true,
      })(req, res, next);
    } else {
      res.render("login", {
        errors: errors.array(),
      });
    }
  });

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
    res.redirect("/users/login");
    }
  });
});

module.exports = router;
