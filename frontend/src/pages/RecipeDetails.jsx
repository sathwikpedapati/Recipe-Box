import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-heaven.onrender.com/recipe/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const goBack = () => {
    navigate("/");
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div
      className="recipe-details"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '40px',
        justifyContent: 'center',
        width: '100vw',
        minHeight: '100vh',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        padding: '20px',
      }}
    >
      <h2>{recipe.title}</h2>
      <img
        src={recipe.coverImage}
        alt={recipe.title}
        width="300px"
        height="300px"
        style={{
          borderRadius: '12px',
          objectFit: 'cover',
          marginBottom: '20px'
        }}
        onError={(e) => { e.target.src = '/fallback-image.png'; }} // Optional fallback
      />
      <p><strong>Time:</strong> {recipe.time}</p>
      <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <br />
      <button
        onClick={goBack}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#00b894',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default RecipeDetails;
