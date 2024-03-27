import React, { useEffect, useState,useContext } from 'react'
import { useSearchParams } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import RecipeCard from './RecipeCard';
import config from '../config';
import { getDislikes, getLikes, saveDislike, saveLike } from '../services/dataService';
import { setInitialLoginStatus } from '../services/auth';
import { StoreContext } from '../services/context';
const Recipes = () => {
    //subscribing to store
    const {store:{recipes:{data}},setStore} = useContext(StoreContext);
    const [param] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(4);

    const handleLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
    };


    // const recipes = [
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    //     { id: 1, title: 'Pasta Carbonara' },
    //     { id: 2, title: 'Chocolate Cake' },
    // ];

    useEffect(() => {
            loadData();
       
    }, []);

    const loadData = async () => {
        try {
            const params = {
                apiKey: config.SA_KEY,
                diet: param.get('diet'),
                meal: param.get('meal'),
                equipment: param.get('equipment'),
                query: searchQuery,
                maxFat: 25,
                number: 12
            };
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${new URLSearchParams(params).toString()}`);
            const result = await response.json();
            updateListLikes(result?.results);
            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            loadData();
            setSearchQuery('');

        }
    };

    const onLike = (id, val) => {
        saveLike(id, val)
        updateListLikes(data)
    }

    const onDislike = (id, val) => {
        saveDislike(id, val)
        updateListLikes(data)
    }

    const updateListLikes = (list) => {
        const likes = getLikes()
        const dislikes = getDislikes()
        console.log('dislikes', dislikes)
        //updating list likes in store 
        setStore((store)=>{
            return {
                ...store,
                recipes:{
                    ...store.recipes,
                    data:list.map(r => ({...r, liked: likes.includes(r.id), disliked: dislikes.includes(r.id)}))
                }
            }
        })
    }

    return (
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
            <div >
                <div className='search-input d-flex'>
                     {/* <input type="text"
                    onKeyPress={handleKeyPress}
                    value={testParam.get('dish')}
                    onChange={(e) => handleSearch(e.target.value)}
    
                    
                    
                    /> */}
                    <input onKeyPress={handleKeyPress} value={searchQuery} onInput={(e) => setSearchQuery(e.target.value)} />
                    <div className='search-icon-container'>
                        <IoSearch className='search-icon' onClick={loadData}  tabIndex={0}/>
                    </div>
                </div>

               

            </div>
            {isLoading ? <div className='loading'>Loading...</div> : (

                <>
                    <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", maxWidth: "1400px", margin: "auto" }}>
                        {data?.slice(0, visibleItems).map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} onLike={onLike} onDislike={onDislike}/>
                        ))}



                    </div>
                    <div className='d-flex justify-center' style={{ paddingBottom: "2rem" }}>
                        {visibleItems < data?.length && (
                            <button onClick={handleLoadMore}>Load More</button>
                        )}

                    </div>
                </>
            )}
        </div>
    )
}

export default Recipes