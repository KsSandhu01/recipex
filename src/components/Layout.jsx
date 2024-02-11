import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { isAuthenticatedKey, setLoggedOut } from '../services/auth';

const Layout = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const logout = ()=>{
        setLoggedOut()
    }
useEffect(()=>{
    const isAuthenticated = JSON.parse(localStorage.getItem(isAuthenticatedKey) ?? 'false');
setLoggedIn(isAuthenticated)
},[])
    console.log(location.pathname)

    return (
        <>

            <nav className='d-flex justify-between'>
                <div >
                    <Link to='/' class="logo"> <MdFastfood /> Recipex</Link>
                    {
                        location.pathname === '/login' || location.pathname !== '/sign-up' &&
                        <ul>
                            <li><Link to="/" className="active"> <FaHome />Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact-us">Contact</Link></li>
                            <li><Link to="/saved-recipes">Saved recipes</Link></li>
                            <li><Link to="/findByIngredients">Search Recipe by Ingredient</Link></li>

                        </ul>
                    }
                </div>
                <div>

                </div>
                <div>
                        
                            <ul>
                                {
                                   isLoggedIn && <li><Link to="/login" onClick={logout} className='d-flex items-center'><HiOutlineLogout />Logout</Link></li>
                                }
                            </ul>
                      
                            <ul>
                                {
                                    !isLoggedIn &&  <li><Link to="/login" className='d-flex items-center'><HiOutlineLogin />Login</Link></li>
                                }
                               
                            </ul>
               
                </div>

            </nav>

            {location.pathname === '/home' || location.pathname === '/' &&
                <header>
                    <div className='bg-image '>
                        <div className='overlay'></div>
                        <div className='z-1 p-2 font-34 custom-center'>
                            <div className=''>

                                <div >Choose From</div>
                                <div className='bold-500 text-center'>Thousands</div>
                                <div className='d-flex justify-center'>
                                    <div className='bold-500 '>of </div><span className='mr-3' >Recipes</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </header>}
            <div className={`${location.pathname === '/' ? '' : 'outlet'}`}>
                <Outlet />
            </div>

            <footer>
                <div class="footer">
                    <div class="row icons d-flex justify-center">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><RiInstagramFill /></a>
                        <a href="#"><FaYoutube /></a>
                        <a href="#"><FaTwitter /></a>
                    </div>

                    <div class="row">
                        <ul>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Our Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>

                    <div class="row">
                        Recipex Copyright © 2024 Recipex - All rights reserved || Designed By: Recipex
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Layout