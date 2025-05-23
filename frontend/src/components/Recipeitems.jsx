import React, { useEffect, useState } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { BsStopwatch } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const fallbackImage = '/fallback-image.png';

const Recipeitems = () => {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const navigate = useNavigate();

  const isMyRecipePage = window.location.pathname === "/myRecipe";
  const favItems = JSON.parse(localStorage.getItem("fav")) ?? [];

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-heaven.onrender.com/recipe/${id}`);
      setAllRecipes(prev => prev.filter(recipe => recipe._id !== id));

      const updatedFavs = favItems.filter(recipe => recipe._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFavs));
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  const favRecipe = (e, item) => {
    e.stopPropagation();
    const isAlreadyFav = favItems.some(recipe => recipe._id === item._id);
    const updatedFavs = isAlreadyFav
      ? favItems.filter(recipe => recipe._id !== item._id)
      : [...favItems, item];

    localStorage.setItem("fav", JSON.stringify(updatedFavs));
    setIsFavRecipe(prev => !prev);
  };

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className='card-container'>
      {allRecipes.map((item, index) => (
        <div
          key={index}
          className='card'
          onClick={() => handleCardClick(item._id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={item.coverImage}
            width="120px"
            height="100px"
            alt={item.title}
            onError={(e) => { e.target.src = fallbackImage; }}
            style={{ objectFit: "cover", borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
          />
          <div className='card-body'>
            <div className='title'>{item.title}</div>
            <div className='icons'>
              <div className='timer'>
                <BsStopwatch /> {item.time}
              </div>
              {!isMyRecipePage ? (
                <FaHeart
                  onClick={(e) => favRecipe(e, item)}
                  style={{
                    color: favItems.some(res => res._id === item._id) ? "red" : "",
                    cursor: "pointer"
                  }}
                />
              ) : (
                <div className='action' onClick={(e) => e.stopPropagation()}>
                  <Link to={`/editRecipe/${item._id}`} className="editIcon">
                    <FaEdit />
                  </Link>
                  <MdDelete
                    className='deleteIcon'
                    onClick={() => onDelete(item._id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipeitems;
