import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { Structure } from "../Components/Structure";
<<<<<<< HEAD
<<<<<<< HEAD
import { AddressKept } from "../Pages/AddressKept";
=======
import { HomePage } from "../Pages/HomePage";
import { MyLocationsPage } from "../Pages/MyLocationsPage";
>>>>>>> 7f77826bb0e3c4fb80aabd1a65a9250b70e0dc72
=======
import { HomePage } from "../Pages/HomePage";
import { MyLocationsPage } from "../Pages/MyLocationsPage";
>>>>>>> 7f77826bb0e3c4fb80aabd1a65a9250b70e0dc72

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Structure />,
    children: [{index: true, element: <HomePage/>},
    {
<<<<<<< HEAD
<<<<<<< HEAD
        element: <Structure />,
        children: [
           {
                path: "/",
                element: <HomePage />
           },
           {
                path: "AddressKept",
                element: <AddressKept />
           },
        ],
=======
      path: "MyLocations",
      element: <MyLocationsPage />
>>>>>>> 7f77826bb0e3c4fb80aabd1a65a9250b70e0dc72
=======
      path: "MyLocations",
      element: <MyLocationsPage />
>>>>>>> 7f77826bb0e3c4fb80aabd1a65a9250b70e0dc72
    },
    ],
  },
];

const router = createBrowserRouter(routes);
export const WeatherAppRouter = () => <RouterProvider router={router} />