import {createBrowserRouter} from "react-router-dom";
import RootLayout from "@/routes/__root.tsx";
import {Home} from "@/routes";
import DashboardLayout from "@/routes/app/dashbooard/__layout.tsx";
import {DashboardIndex} from "@/routes/app/dashbooard";
import AppLayout from "@/routes/app/__layout.tsx";
import {Test} from "@/routes/app/test.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: "",
                element: <AppLayout/>,
                children: [
                    {
                        index: true,
                        element: <Home/>
                    },
                    {
                        path: "dashboard",
                        element: <DashboardLayout/>,
                        children: [{
                            index: true,
                            element: <DashboardIndex/>
                        }]
                    }
                ]
            },
            {
                path: "selection",
                element: <Test/>
            },
            {
                path: "*",
                element: <div>404 - Not Found</div>,
            },
        ],
    }
])