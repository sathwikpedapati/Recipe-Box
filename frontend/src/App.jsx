import React from 'react';
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from './components/MainNavigation';
import axios from "axios";
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

const getAllRecipes = async () => {
  let allRecipes = [];
  try {
    const res = await axios.get("https://recipe-heaven.onrender.com/recipe");
    allRecipes = res.data;
  } catch (err) {
    console.error("Error fetching all recipes:", err);
  }
  return allRecipes;
};

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy === user?._id);
};

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) ?? [];
};

const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails /> } 
    ]
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
