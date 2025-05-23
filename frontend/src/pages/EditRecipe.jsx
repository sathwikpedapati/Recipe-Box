import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    time: '',
    ingredients: '',
    instructions: '',
    file: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://recipe-heaven.onrender.com/recipe/${id}`);
        const res = response.data;

        setRecipeData({
          title: res.title,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          time: res.time,
          file: null,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    getData();
  }, [id]);

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    let val = name === "file" ? files[0] : value;

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

    if (recipeData.file) {
      formData.append("coverImage", recipeData.file);
    }

    try {
      await axios.put(`https://recipe-heaven.onrender.com/recipe/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating recipe:", error.response?.data || error.message);
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
          <label>Recipe Image (optional)</label>
          <input
            type="file"
            className="input"
            name="file"
            accept="image/*"
            onChange={onHandleChange}
          />
        </div>

        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
