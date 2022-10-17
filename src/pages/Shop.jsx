import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Product from '../components/Product/Product';
import { addToDb, deleteShoppingCart, getStoreCart } from '../utilities/fakedb';

const Shop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([]);
    //clear cart
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    useEffect(() => {
        // console.log('local Storage First line', products)
        const storedCart = getStoreCart();
        // console.log(storedCart);
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(addedProduct);
            }
        }
        setCart(savedCart);
    },[products]);

    const addToCart = (selectedProduct) => {
        // console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id)
    }
    return (
        <div className='shopContainer grid lg:grid-cols-4 gap-3 px-16 mt-10'>
            <div className="productsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 gap-4 shadow-2xl">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        />)
                }
            </div>
            <div className="cartContainer col-span-1 md:flex-col-reverse bg-gray-800 p-4 shadow-2xl border-4 border-[#ebebeb1a]">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/orders'>
                        <button className='bg-gray-900 hover:bg-gray-800 hover:border-gray-700 border-4 border-[#ebebeb1a] text-white text-lg font-semibold w-full py-2 mt-4 rounded-md cursor-pointer shadow-xl'>Review Cart</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;