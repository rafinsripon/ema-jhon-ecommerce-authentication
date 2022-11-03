import { getStoreCart } from "../utilities/fakedb";

export const productsAndCartLoaders = async () => {
    //get products
    const productsData = await fetch('http://localhost:5000/products')
    const {products} = await productsData.json();
    // console.log("products", products)

    //get Cart
    const savedCart = getStoreCart();
    const inititalCart = [];
    for(const id in savedCart){
        const addedProduct = products.find(product => product._id === id);
        if(addedProduct){
            const quantity = savedCart[id];
            // console.log(id, quantity);
            addedProduct.quantity = quantity;
            inititalCart.push(addedProduct);
        }
    }
    // console.log('savedCart', savedCart);

return {products, inititalCart};
}