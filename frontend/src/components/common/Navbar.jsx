import React from 'react';
import {  useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    var isAuthenticated = UserService.isAuthenticated();
    const navigate=useNavigate();


    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            isAuthenticated=0;
            if(!isAuthenticated)
                {
                    navigate("/");
                }
        }
    };
    const handleclick1=()=>{
        if(isAuthenticated===true)
            {
                navigate('/profile');
            }
        else{
            alert("Please login")
        }
    }
    const handleclick2=()=>{
        if(isAuthenticated===true)
            {
                navigate('/user-management');
            }
        else{
            alert("Please login")
        }
    }
    const handleclick3=()=>{
        navigate('/home')
    }


    return (
        <nav>
            <ul>
                <li><button onClick={handleclick3}>Home</button></li>
                <li><button onClick={handleclick1}>Profile</button></li>
                <li><button onClick={handleclick2}>User Management</button></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;
