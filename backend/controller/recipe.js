const Recipes = require("../models/recipe");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (err) {
    console.error("Get Recipes Error:", err);
    return res.status(500).json({ message: "Error fetching recipes" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    console.error("Get Recipe Error:", err);
    return res.status(500).json({ message: "Error fetching recipe" });
  }
};

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(",").map(i => i.trim()),
      instructions,
      time,
      coverImage: req.file?.path || null, 
      createdBy: req.user.id
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Add Recipe Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  try {
    const updateData = {
      title,
      ingredients: Array.isArray(ingredients)
        ? ingredients
        : ingredients.split(",").map(i => i.trim()),
      instructions,
      time
    };

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(updatedRecipe);
  } catch (err) {
    console.error("Edit Recipe Error:", err);
    res.status(500).json({ message: "Server error while updating recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
};
