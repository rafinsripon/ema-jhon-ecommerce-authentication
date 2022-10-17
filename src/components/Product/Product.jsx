import React from 'react';

const Product = ({product, addToCart}) => {
    const {name, img, seller, price, ratings} = product;
    return (
        <div className='border-[#ebebeb1a] border-2 bg-gray-800 rounded-md p-2 relative h-[470px] md:h-[480px] lg:h-[470px] shadow-2xl'>
                <img className='rounded-[6px]' src={img} alt="" />
                <div className='pt-2'>
                    <h3 className='text-orange-500 font-semibold'>{name}</h3>
                    <h4 className='font-semibold text-lg'>Price: {price}</h4>
                    <p className='font-semibold'>seller: {seller}</p>
                    <span className='font-bold text-orange-600'>Ratings: {ratings}</span>
                </div>
            <div>
                <button onClick={() => addToCart(product)} className='w-full bg-gray-700 absolute bottom-0 left-0 rounded-b-sm text-xl p-2 hover:bg-gray-600 text-white'>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;