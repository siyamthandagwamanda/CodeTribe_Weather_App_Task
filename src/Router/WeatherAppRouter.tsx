import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { Structure } from "../Components/Structure";
import { HomePage } from "../Pages/HomePage";
import { MyLocationsPage } from "../Pages/MyLocationsPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Structure />,
    children: [{index: true, element: <HomePage/>},
    {
        element: <Structure />,
        children: [
           {
                path: "/",
                element: <HomePage />
           },
           {
             path: "/MyLocations",
             element: <MyLocationsPage />
           }
        ],
    },
    ],
  },
];

const router = createBrowserRouter(routes);
export const WeatherAppRouter = () => <RouterProvider router={router} />