// SaveButton.js
import React, { useEffect, useState } from 'react';
import { MdSaveAlt } from "react-icons/md";
import { CiBookmarkRemove } from "react-icons/ci";
import { getSavedRecipe, saveRecipe } from '../services/dataService';

const SaveButton = ({ item, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(item);
    saveRecipe(item)
  };

  useEffect(() => {
    if (item && item.id) {
      setIsSaved(!!getSavedRecipe(item.id))
    }
  }, [item])

  return (
    <button onClick={handleSave} className="save-btn">
      {isSaved ? (<div>Remove from Saved <CiBookmarkRemove/></div>) : (<div>Save for Later <MdSaveAlt/></div>)}
    </button>
  );
};

export default SaveButton;
