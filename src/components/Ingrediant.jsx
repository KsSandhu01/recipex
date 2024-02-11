import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import config from '../config';
import RecipeCard from './RecipeCard';
import { IoSearch } from 'react-icons/io5';

const Ingrediant = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [param] = useSearchParams()
    const [visibleItems, setVisibleItems] = useState(4);
    const [ingredients, setIngredients] = useState('');
    const [numberOfRecipes, setNumberOfRecipes] = useState(2);

    const handleInputChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    }

    const loadData = async () => {
        try {

if(ingredients){
    const params = {
        apiKey: config.SA_KEY,
        diet: param.get('diet'),
        meal: param.get('meal'),
        equipment: param.get('equipment'),
        query: searchQuery,
        maxFat: 25,
        number: 12
    };
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${config.SA_KEY}`);
    const result = await response.json();
    console.log("result", result)
    setData(result);
    setIsLoading(false);
}else{
    const params = {
        apiKey: config.SA_KEY,
        diet: param.get('diet'),
        meal: param.get('meal'),
        equipment: param.get('equipment'),
        query: searchQuery,
        maxFat: 25,
        number: 12
    };
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=10&apiKey=${config.SA_KEY}`);
    const result = await response.json();
    console.log("result", result)
    setData(result);
    setIsLoading(false);
}
            
          

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

    const handleLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
    };

    useEffect(() => {
        if (data.length === 0) {
            loadData()
        }
    }, []);

    return (
        <div style={{ maxWidth: "1400px", margin: "auto" }}>

            <div >
               
                <div className='d-flex ' style={{padding:"2rem 0"}}>
                    <input type="text" value={ingredients} onChange={handleInputChange} placeholder="Enter ingredients" />
                    <div className='search-icon-container'>
                        <IoSearch className='search-icon' onClick={handleSearch} tabIndex={0} />
                    </div>
                </div>


            </div>
            {isLoading ? <div className='loading'>Loading...</div> : (

                <>
                    <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", maxWidth: "1400px", margin: "auto" }}>
                        {data?.slice(0, visibleItems).map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} />
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

export default Ingrediant