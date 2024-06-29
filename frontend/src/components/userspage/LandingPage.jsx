/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
function LandingPage() {
    var isAuthenticated = UserService.isAuthenticated();
    const navigate=useNavigate();
    const isAdmin=UserService.isAdmin();
   const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    height: '10vh',
    width: '200px',
    backgroundColor: 'black',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  };
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
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadExcel = async () => {
    setIsDownloading(true);
    try {
      if(!isAdmin)
        {
          alert("You do not have access");
        }
        else{
      const response = await fetch(`${UserService.BASE_URL}/export/excel`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate Excel file');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xls'); // Change extension for desired format
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}catch (error) {
      console.error('Error downloading Excel:', error);
    } finally {
      setIsDownloading(false);
    }
  }
  const [isDownloading2, setIsDownloading2] = useState(false);
  const handleDownloadPdf = async () => {
    setIsDownloading2(true);
    try {
    if(!isAdmin)
      {
        alert("You do not have access");
      }
    else{
      const response = await fetch(`${UserService.BASE_URL}/export/pdf`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to generate Excel file');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.pdf'); // Change extension for desired format
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } }catch (error) {
      console.error('Error downloading Excel:', error);
    } finally {
      setIsDownloading2(false);
    }
  };
  const handleclick=()=>{
    if(isAdmin)
      {
        navigate('/register');
      }
    else{
      alert("You do not have access")
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
      <div>
        <button style={buttonStyle}><Link to={`/user-management`}>View Users</Link></button>
        <button style={buttonStyle} onClick={handleclick}>Add Users</button>
        <button style={buttonStyle} onClick={handleDownloadExcel}>Export to excel</button>
        <button style={buttonStyle} onClick={handleDownloadPdf}>Export to pdf</button>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LandingPage
