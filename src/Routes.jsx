import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Shipping from "./components/shipping/Shipping";
import Root from "./layouts/Root";
import { productsAndCartLoaders } from "./loaders/ProductsAndCartLoaders";
import About from "./pages/About";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "shop",
                loader: () => fetch('products.json'),
                element: <Shop />
            },
            {
                path: "orders",
                loader: productsAndCartLoaders,
                element: <Orders />
            },
            {
                path: "shipping",
                element:  <PrivateRoute>
                    <Shipping />
                </PrivateRoute>
            },
            {
                path: "about",
                element:  <About />
            },
            {
                path: "login",
                element:  <Login />
            },
            {
                path: "signup",
                element:  <Signup />
            },
        ]
    }
])