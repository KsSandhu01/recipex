import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail';
import NoPage from './components/NoPage';
import Layout from "./components/Layout";
import Login from "./components/Login";
import Recipes from "./components/Recipes";
import { useState } from "react";
import Registration from "./components/Registration";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedRecipes from "./components/SavedRecipes";
import About from "./components/About";
import Contact from "./components/Contact";
import Ingrediant from "./components/Ingrediant";


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipe-detail/:id" element={<RecipeDetail />} />
          <Route path="home" element={<Home />} />
          <Route path="recipes" element={<Recipes  />} />
          <Route path="about" element={<About  />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="findByIngredients" element={<Ingrediant />} />

          <Route path="saved-recipes" element={<SavedRecipes  />} />
         

          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Registration />} />


          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
