import React, { useContext, useEffect, useState } from 'react'
import SavedList from './SaveList'
import { getSavedRecipes, removeSavedRecipe } from '../services/dataService';
import RecipeCard from './RecipeCard';
import { StoreContext } from '../services/context';

const SavedRecipes = () => {
  //subscribing to store and setstore
  const {store:{recipes:{savedItems}},setStore} = useContext(StoreContext)
  const handleRemove = (id) => {
    //handling remove item for global store 
    setStore((store)=>{
      return {
        ...store,
        recipes:{
          savedItems : store.recipes.savedItems.filter((rec) => rec.id !== id)
        }
      }
    })
    removeSavedRecipe(id)
  };

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