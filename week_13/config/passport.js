const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (
      email,
      password,
      done
    ) {
      let query = { email: email };
      let user = await User.findOne(query)
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        done(null, false, { error: err });
      }
      done(err, user);
    });
  });
};
