import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index:  true,
                element: <Home></Home>
            },
            {
                path: '/signin',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])