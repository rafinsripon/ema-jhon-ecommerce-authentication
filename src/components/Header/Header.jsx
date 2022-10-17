import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../../contexts/UserContext';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(user);
    const handleSignOut = () => {
        logOut()
        .then(() => {
            navigate('/login');
        })
        .catch(error => {
            console.log(error);
        }) 
    }
    return (
        <div className="navbar bg-gray-900 rounded-lg justify-between container mx-auto px-6">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 mobile-menu">
                    <li>
                        <NavLink className="font-semibold" to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/shop'>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/orders'>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/about'>About</NavLink>
                    </li>
                    {
                        user?.uid ? 
                        <button onClick={handleSignOut} className="font-semibold">Sign Out</button>
                        : <>
                        <li>
                            <NavLink className="font-semibold" to='/login'>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink className="font-semibold" to='/signup'>Sign Up</NavLink>
                        </li>
                        </>
                    }
                </ul>
                </div>
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex main-menu">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <NavLink className="font-semibold" to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/shop'>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/orders'>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink className="font-semibold" to='/about'>About</NavLink>
                    </li>
                    {
                        user?.uid ? 
                        <button onClick={handleSignOut} className="font-semibold">Sign Out</button>
                        : <>
                        <li>
                            <NavLink className="font-semibold" to='/login'>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink className="font-semibold" to='/signup'>Sign Up</NavLink>
                        </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;