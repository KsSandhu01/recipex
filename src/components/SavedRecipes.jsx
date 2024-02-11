import React, { useEffect, useState } from 'react'
import SavedList from './SaveList'
import { getSavedRecipes, removeSavedRecipe } from '../services/dataService';
import RecipeCard from './RecipeCard';

const SavedRecipes = () => {
  const [savedItems, setSavedItems] = useState([]);

  const handleRemove = (id) => {
    console.log('handleRemove', id)
    removeSavedRecipe(id)
    updateData()
  };

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    console.log(getSavedRecipes())
    setSavedItems(getSavedRecipes())
  }

  return (
    <div style={{padding: '30px 30px'}}>
      {/* <SavedList savedItems={savedItems} onRemove={handleRemove} /> */}
      <h2>Saved Items</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", maxWidth: "1400px", margin: "auto" }}>
                {savedItems?.map((recipe, index) => (
                    <RecipeCard isSavedItem={true} key={index} recipe={recipe} onRemove={handleRemove} />
                ))}

            </div>
    </div>
  )
}

export default SavedRecipes