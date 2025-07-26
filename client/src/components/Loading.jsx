import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
    const {navigate} = useContext(AppContext);
    const {search} = useLocation();

    const query = new URLSearchParams(search);
    const nextUrl = query.get("next");
    
    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`); 
            }, 5000);
        }
    }, [nextUrl, navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
    </div>
  )
}

export default Loading