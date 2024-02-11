// SavedList.js
import React from 'react';
import { MdDelete } from "react-icons/md";

const SavedList = ({ savedItems, onRemove }) => {
  return (
    <div>
      <h2>Saved Items</h2>
      <ul>
        {savedItems.map((item, index) => (
          <li key={index}>
            {item.title}{' '}
            <button onClick={() => onRemove(item)}><MdDelete/> </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedList;
