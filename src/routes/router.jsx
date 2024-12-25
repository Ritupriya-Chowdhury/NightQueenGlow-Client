import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home'
import Products from "../pages/Products";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact"
import Page404 from "../pages/404Page";
import Registration from "../pages/Registration";
import ProductDetails from "../pages/ProductDetails";




const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [

        {
          path: '',
          element: <Home />
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'products/:id',
          element: <ProductDetails />
        },
        {
          path: 'about',
          element: <AboutUs />
        },
        {
          path: 'contact',
          element: <Contact/>
        }
      ]
    }, 
    {
      path:'/signup',
      element:<Registration/>
    },
    {
      path:'/*',
      element:<Page404/>
    },

])


export default router;