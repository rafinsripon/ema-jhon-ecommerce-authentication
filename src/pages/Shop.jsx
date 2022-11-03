import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Product from '../components/Product/Product';
import { addToDb, deleteShoppingCart, getStoreCart } from '../utilities/fakedb';

/*
Count lagbe: done -> form server site
perPage = 10ta kore
page = count / perpage
*/

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([]);
    //pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const pages = Math.ceil(count / size);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products)
            })
    }, [page, size])

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
        const ids = Object.keys(storedCart)

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                        // console.log(addedProduct);
                    }
                }
                setCart(savedCart);
            })

    }, [products]);

    const addToCart = (selectedProduct) => {
        // console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id)
    }
    return (
        <div>
            <div className='shopContainer grid lg:grid-cols-4 gap-3 px-16 mt-10'>
                <div className="productsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 gap-4 shadow-2xl">
                    {
                        products.map(product => <Product
                            key={product._id}
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
            <div className="pagination text-center mb-28">
                <p>currently selected page: {page} & size {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        onClick={() => setPage(number)}
                    >
                        <button className={page === number ? 'bg-cyan-500 p-2 mt-4 ml-4 rounded-md text-lg text-white font-bold' : 'bg-pink-500 p-2 mt-4 ml-4 rounded-md text-lg text-white font-bold'}>{number + 1}</button>
                    </button>)
                }
                <select onChange={(event) => setSize(event.target.value)} className="select border-pink-500 ml-4">
                    <option value='5'>5</option>
                    <option value='10' selected>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;