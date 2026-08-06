import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
]);
