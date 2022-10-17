import React from 'react';

const Cart = (props) => {
    const {cart, clearCart, children} = props;
    // console.log(cart);
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 10 / 100).toFixed(2));
    // const taxParse = parseFloat(tax);
    const grandTotal = total + shipping + tax;
    return (
        <div className='sticky top-0 text-gray-300'>
            <h3 className='font-semibold text-xl uppercase border-b-2 border-orange-500 py-2'>Hello Cart Summary</h3>
            {/* <p className='font-semibold mt-4 text-lg'>Selected Items: {cart.length}</p> */}
            <p className='font-semibold mt-4 text-lg'>Selected Items: {quantity}</p>
            <h4 className='text-lg font-semibold mt-5'>Total Price: ${total}</h4>
            <h4 className='text-lg font-semibold mt-5'>Total shipping: ${shipping}</h4>
            <h4 className='text-lg font-semibold mt-5'>Tax: ${tax}</h4>
            <h3 className='text-xl font-extrabold mt-5'>Grand Total: <span className='text-orange-600'>${grandTotal.toFixed(2)}</span></h3>
            <button onClick={clearCart} className='bg-gray-800 border-4 border-[#ebebeb1a] hover:border-pink-500 transition-all ease-in-out text-white text-lg font-semibold w-full py-2 mt-8 rounded-md cursor-pointer shadow-xl'>Clear Cart</button>
            {children}
        </div>
    );
};

export default Cart;