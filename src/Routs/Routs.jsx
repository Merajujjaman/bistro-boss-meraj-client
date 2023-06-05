import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../Register/Register";
import PrivateRout from "./PrivateRout";
import DashboardLyout from "../Layouts/DashboardLyout";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../pages/Dashboard/MyCart/AllUsers/AllUsers";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children : [
            {
                path: '/', 
                element: <Home></Home>
            },
            {
                path: 'menu',
                element:<PrivateRout><Menu></Menu></PrivateRout>
            },
            {
              path: 'order/:category',
              element: <Order></Order>
            },
            {
              path: 'login',
              element: <Login></Login>
            },
            {
              path: 'register',
              element: <Register></Register>
            },
           
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRout><DashboardLyout></DashboardLyout></PrivateRout>,
      children: [
        {
          path: 'myCart',
          element: <MyCart></MyCart>
        },
        {
          path: 'allusers',
          element: <AllUsers></AllUsers>
        }
      ]
    }
  ]);

  export default router ;