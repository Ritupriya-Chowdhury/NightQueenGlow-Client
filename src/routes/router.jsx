import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home'
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact"
import Page404 from "../pages/404Page";
import Registration from "../pages/Registration";
import ProductDetails from "../pages/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import BuyerDashboard from "../pages/DashBoard/BuyerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import SellerDashboard from "../pages/DashBoard/SellerDashboard";
import AdminDashboard from "../pages/DashBoard/AdminDashboard";
import Profile from "../pages/DashBoard/Buyer/Profile";
import Products from "../pages/Products";
import Wishlist from "../pages/DashBoard/Buyer/Wishlist";
import Carts from "../pages/DashBoard/Buyer/Carts";





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
        },
        
      ]
    }, 
    {
      path: "/buyer-dashboard",
      element: (
        <PrivateRoute>
          <ProtectedRoute allowedRoles={["buyer"]} />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <BuyerDashboard />,
          children:[
            {
              path: "",
              element: <Profile />,
            },
            {
              path: "wishlist",
              element: <Wishlist/>,
            },
            {
              path: "cart",
              element: <Carts/>,
            },

          ]
        },
        
      ],
    },
    {
      path: "/seller-dashboard",
      element: (
        <PrivateRoute>
          <ProtectedRoute allowedRoles={["seller"]} />
        </PrivateRoute>
      ),
      children: [
        
        {
          path: "",
          element: <SellerDashboard/>,
          children:[
            {
              path: "",
              element: <Profile />,
            },
          ]
        },
      ],
    },
    {
      path: "/admin-dashboard",
      element: (
        <PrivateRoute>
          <ProtectedRoute allowedRoles={["admin"]} />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <AdminDashboard/>,
          children:[
            {
              path: "",
              element: <Profile />,
            },
          ]
        },
      ],
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