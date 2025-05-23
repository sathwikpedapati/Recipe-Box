import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFoodRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    time: '',
    ingredients: '',
    instructions: '',
    file: null,
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    let val;

    if (name === "ingredients") {
      val = value;
    } else if (name === "file") {
      val = files[0];
    } else {
      val = value;
    }

    setRecipeData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

 const onHandleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", recipeData.title);
  formData.append("time", recipeData.time);
  formData.append("ingredients", recipeData.ingredients);
  formData.append("instructions", recipeData.instructions);
  formData.append("coverImage", recipeData.file); 

  try {
    await axios.post("https://recipe-heaven.onrender.com/recipe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    });
    navigate("/");
  } catch (error) {
    console.error("Error uploading recipe:", error.response?.data || error.message);
  }
};

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            className="input"
            name="title"
            value={recipeData.title}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="form-control">
          <label>Time</label>
          <input
            type="text"
            className="input"
            name="time"
            value={recipeData.time}
            onChange={onHandleChange}
          />
        </div>

        <div className="form-control">
          <label>Ingredients (comma-separated)</label>
          <textarea
            className="input"
            name="ingredients"
            rows="5"
            style={{ height: 'auto', minHeight: '150px' }}
            value={recipeData.ingredients}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="form-control">
          <label>Instructions</label>
          <textarea
            className="input"
            name="instructions"
            rows="5"
            style={{ height: 'auto', minHeight: '150px' }}
            value={recipeData.instructions}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="form-control">
          <label>Recipe Image</label>
          <input
            type="file"
            className="input"
            name="file"
            accept="image/*"
            onChange={onHandleChange}
            required
          />
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddFoodRecipe;
