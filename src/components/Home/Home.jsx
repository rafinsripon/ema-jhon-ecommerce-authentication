import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../images/banner.png';
import './Home.css'

const Home = () => {
    const navigate = useNavigate()
    const shopNow = () => {
        navigate('/shop');
    }
    return (
        <div className='mt-16 w-[80%] mx-auto flex items-center gap-20'>
            <div>
                <span className='text-base font-semibold text-orange-400 mb-4 block'>Sale up to 70% off</span>
                <h1 className='text-4xl font-bold'>New Collection For Fall</h1>
                <p className='text-lg font-semibold mt-4'>Discover all the new arrivals of ready-to-wear collection.</p>
                <button onClick={() => shopNow()} className='bg-orange-500 px-6 py-2 rounded-md text-white mt-10'>SHOP NOW</button>
            </div>
            <div className='relative banner_img'>
                <img className='w-full h-[500px]' src={banner} alt="" />
            </div>
        </div>
    );
};

export default Home;