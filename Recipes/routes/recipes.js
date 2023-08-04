var express = require('express');
var router = express.Router();


route.get("/:id", async function(req, res){
  let recipe;
  try{
    recipe = await Recipe.findById(req.params.id)
  } catch{}

  if(!recipe){
      res.send("No recipe Found")
  } else {
      res.render("recipe", {
          recipe: recipe
      })
  }
})

route.delete("/recipe/:id", async function(req, res) {
  let query = {_id: req.params,id}

  let result;
  try{
      result = await Recipe.deleteOne(query)
  } catch{}

  if(!result){
      res.send("Recipe not deleted")
  } else {
      res.send("Sucessfully Deleted")
  }
})

route.route("/recipe/edit/:id")
  .get(async function (req, res) {
      let recipe;
      try{
        recipe = await Recipe.findById(req.params.id)
      } catch{}

      if(!recipe){
          res.send("No recipe Found")
      } else {
          res.render("recipe", {
            recipe: recipe
          })
      }
  })

  .delete(async (req, res) => {
    let query = { _id: req.params.id };

    let recipe = await Recipe.findById(req.params.id)
    if(!recipe){
      res.send("Could not find recipe")
    }
    let result = Recipe.deleteOne(query, function (err) {
      if (!result) {
        res.status(500).send();
      } else {
        res.send("Successfully Deleted");
      }
    }) 
  });
  
module.exports = router;
