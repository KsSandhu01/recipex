import React, { useEffect, useRef, useState,useContext } from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { collection, addDoc, getDocs } from 'firebase/firestore';

import image from '../assets/f.jpg'
import { MdDelete } from 'react-icons/md';
import { db } from '../firebase/firebase';
import { StoreContext } from '../services/context';
const RecipeCard = ({ recipe, isSavedItem = false, onRemove = (id) => { }, onLike = (id, val) => { }, onDislike = (id, val) => { } }) => {
  //subscribing authentication
const {store:{user:{isUserLoggedIn : isLogin}}} = useContext(StoreContext)

  const handleLikeClick = async () => {
    // if (!like) {
    onLike(recipe.id, !recipe.liked)
    // setLike(!like);
    // setDislike(false);


    // try {
    //     const docRef = await addDoc(collection(db, "likes"), {
    //       like: like,    
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // }
  };
  // const fetchLikes = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'likes'));
  //     const fetchedLikes = [];
  //     querySnapshot.forEach((doc) => {
  //       fetchedLikes.push({ id: doc.id, ...doc.data() });
  //     });
  //     setLike(fetchedLikes);
  //     console.log("likes",fetchedLikes)
  //   } catch (error) {
  //     console.error('Error fetching likes: ', error);
  //   }
  // };

  const handleDislikeClick = () => {
    // if (!dislike) {
    onDislike(recipe.id, !recipe.disliked)
    // setDislike(!dislike);
    // setLike(false);
    // }
  };

  return (
    <>
      <div key={recipe.id} style={{ maxWidth: "300px", marginBottom: "2rem" }}>
        <div className="card-wrapper">
          <div className="card">
            <Link to={`/recipe-detail/${recipe.id}`}>
              {/* <img src={recipe.image} alt="image" className='card-image' /> */}
              <img src={recipe.image} alt="image" className='card-image' />
            </Link>
            <div className='d-flex justify-between'>
              <h3>{recipe.title}</h3>
              <div className='d-flex'>
                {!isSavedItem ?
              
                  <>
                    {isLogin && (
                    <>
                    <div onClick={handleLikeClick} style={{ marginRight: '10px' }} className='like-icons'>
                      {recipe.liked ? <AiFillLike /> : <AiOutlineLike />}
                    </div>
                    <div onClick={handleDislikeClick} className='like-icons'>
                      {recipe.disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                    </div>
                    </>
                    )}
                  </>
                  :
                  <div onClick={() => onRemove(recipe.id)} className='like-icons'>
                    <MdDelete />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeCard