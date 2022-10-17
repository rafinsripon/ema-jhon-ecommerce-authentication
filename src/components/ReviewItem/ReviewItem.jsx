import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import './ReviewItem.css';

const ReviewItem = ({product, handleRemoveItem}) => {
    const{name, price, quantity, img, shipping, id} = product;
    return (
        <div className='reviews flex items-center gap-4 mb-3 border-2 border-red-300 bg-white rounded-lg pr-6 h-[150px]'>
            <div className="image_reviews">
                <img className='w-[150px] h-[140px] rounded-l-lg' src={img} alt="" />
            </div>
            <div className="reviewsItems flex items-center justify-between w-full">
                <div className="reviewInfo text-gray-800">
                <h2 className='text-lg font-semibold mt-2'>{name}</h2>
                <p className='text-lg font-semibold mt-2 text-pink-400'>price: ${price}</p>
                <p className='text-lg font-semibold mt-1'>shipping: ${shipping}</p>
                <p className='text-lg font-semibold mt-1  mb-2 text-purple-400'>Quantity: {quantity}</p>
                </div>
                <button onClick={() => handleRemoveItem(id)} className="deleteIcons">
                    <span><FaTrashAlt /></span>
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;