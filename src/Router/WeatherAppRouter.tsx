import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import  {HomePage}  from "../Pages/HomePage";
import { Structure } from "../Components/Structure";
import { AddressKept } from "../Pages/AddressKept";

const router = createBrowserRouter([
    {
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
    },
]);

export const WeatherAppRouter = () => {
    return <RouterProvider router={router}/>
}