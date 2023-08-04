const express = require('express');
const router = express.Router();
const User = require('../models/user');

router
    .get('/register', (req, res) => {
    res.render('register');
    });

router
    .post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];

    if (!name) {
        errors.push({ msg: 'Name is required' });
    }

    if (!email) {
        errors.push({ msg: 'Email is required' });
    }

    if (!password) {
        errors.push({ msg: 'Password is required' });
    }

    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        errors.push({ msg: 'Email is already registered' });
    }

    if (errors.length > 0) {
        res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
        });
    } else {
    
        const newUser = new User({
        name,
        email,
        password
        });

        await newUser.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
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

router
    .get('/logout', (req, res) => {
        req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
        });
    });


module.exports = router;
