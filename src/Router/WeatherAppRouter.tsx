import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Structure } from "../Components/Structure";
import { HomePage } from "../Pages/HomePage";
import { AddressKeptPage } from "../Pages/AddressKeptPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Structure />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "address-kept",
        element: <AddressKeptPage />,
      },
    ],
  },
]);

export const WeatherAppRouter = () => {
  return <RouterProvider router={router} />;
};