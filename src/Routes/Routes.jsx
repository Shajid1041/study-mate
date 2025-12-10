import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import CreatePartnerProfile from "../Pages/createPartnerProfile";
import FindPartners from "../Pages/FindPartners";
import PartnerDetails from "../Components/PartnerDetails/PartnerDetails";
import MyConnection from "../Pages/MyConnection";
import Profile from "../Components/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/signin',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/profile',
                element: <PrivateRoutes>
                    <Profile></Profile>
                </PrivateRoutes>
            },
            {
                path: 'find-partners',
                element: <FindPartners></FindPartners>
            },
            {
                path: '/find-partners/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/partners/${params.id}`),
                element: <PrivateRoutes>
                    <PartnerDetails></PartnerDetails>
                </PrivateRoutes>
            },
            {
                path: '/create-partner-profile',
                element: <PrivateRoutes>
                    <CreatePartnerProfile></CreatePartnerProfile>
                    </PrivateRoutes>
            },
            {
                path: 'my-connection',
                element: <PrivateRoutes>
                    <MyConnection></MyConnection>
                </PrivateRoutes>
            }
        ]
    }
])