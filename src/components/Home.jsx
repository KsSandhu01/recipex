import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GiGreenPower, GiWheat, GiBroccoli, GiWeightLiftingUp, GiChickenOven, GiSaucepan } from "react-icons/gi";
import { FaIceCream, FaLeaf, FaUtensils, FaCoffee, FaBlender } from 'react-icons/fa';
import { LuMicrowave  } from 'react-icons/lu';


const Home = () => {



  return (
    <div style={{padding: '50px 0'}}>
      <div>
        <h1 style={{textAlign: 'center'}}>Diets</h1>
        <div className='d-flex justify-center icon-container'>
          <div className='icon-container-child' >
            <Link to='recipes?diet=Vegetarian' className='link' >
              <div className='icon-box'><GiGreenPower /></div>
              <div>Vegetarian</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?diet=Ketogenic' className='link'>
              <div className='icon-box'><GiWeightLiftingUp /></div>
              <div>Ketogenic</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?diet=Vegan' className='link'>
              <div className='icon-box'><GiBroccoli /></div>
              <div>Vegan</div>
            </Link>

          </div>
          <div className='icon-container-child'>
            <Link to='recipes?diet=Gluten Free' className='link'>
              <div className='icon-box'><GiWheat /></div>
              <div>Gluten Free</div>
            </Link>

          </div>
        </div>

      </div>
      <div>
        <h1 style={{textAlign: 'center'}}>Meal</h1>
        <div className='d-flex justify-center icon-container'>
          <div className='icon-container-child' >
            <Link to='recipes?meal=main course' className='link' >
              <div className='icon-box'><FaUtensils /></div>
              <div>Main Course</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?meal=breakfast' className='link'>
              <div className='icon-box'><FaCoffee  /></div>
              <div>breakfast</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?meal=dessert' className='link'>
              <div className='icon-box'><FaIceCream /></div>
              <div>Dessert</div>
            </Link>

          </div>
          <div className='icon-container-child'>
            <Link to='recipes?meal=salad' className='link'>
              <div className='icon-box'><FaLeaf /></div>
              <div>Salad</div>
            </Link>

          </div>
        </div>

      </div>
      <div>
        <h1 style={{textAlign: 'center'}}>Equipment</h1>
        <div className='d-flex justify-center icon-container'>
          <div className='icon-container-child' >
            <Link to='recipes?equipment=oven' className='link' >
              <div className='icon-box'><GiChickenOven /></div>
              <div>Oven</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?equipment=microwave' className='link'>
              <div className='icon-box'><LuMicrowave /></div>
              <div>microwave</div>
            </Link>
          </div>
          <div className='icon-container-child'>
            <Link to='recipes?equipment=frying pan' className='link'>
              <div className='icon-box'><GiSaucepan /></div>
              <div>Frying Pan</div>
            </Link>

          </div>
          <div className='icon-container-child'>
            <Link to='recipes?equipment=blender' className='link'>
              <div className='icon-box'><FaBlender /></div>
              <div>Blender</div>
            </Link>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Home