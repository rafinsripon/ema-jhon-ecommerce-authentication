import { getStoreCart } from "../utilities/fakedb";

export const productsAndCartLoaders = async () => {
    //get products
    const productsData = await fetch('products.json')
    const products = await productsData.json();
    // console.log("products", products)

    //get Cart
    const savedCart = getStoreCart();
    const inititalCart = [];
    for(const id in savedCart){
        const addedProduct = products.find(product => product.id === id);
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