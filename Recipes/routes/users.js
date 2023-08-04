var express = require('express');
var router = express.Router();
const Recipe = require('./models/recipe');

const { check, validationResult } = require("express-validator");

let User = require("../models/user");

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    await check("name", "Name is required").notEmpty().run(req);
    await check("description", "Description is required").notEmpty().run(req);
    await check("difficulty", "Difficulty is required").notEmpty().run(req);
    await check("ingredients", "Ingredients is required").notEmpty().run(req);
    await check("steps", "steps is required").notEmpty().run(req);

        const errors = validationResult(req)

        let recipe = new Recipe()

        if(errors.isEmpty()){
            let book = new Book()
    
            recipe.name = req.body.name
            recipe.description = req.body.description
            recipe.pages = req.body.pages
            recipe.difficulty = req.body.difficulty
            recipe.ingredients = req.body.ingredients
            recipe.steps = req.body.steps

            try{
                await recipe.save()
                res.redirect("/")
            } catch {
                console.log("Error saving recipe")
                return
            }
        } else {
            console.log(erros)
            res.render("add_recipe", {
                "errors": errors.array()
            })
        }
    })

module.exports = router;
