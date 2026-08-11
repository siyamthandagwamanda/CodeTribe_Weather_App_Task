import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Structure } from "../Components/Structure";
import { HomePage } from "../Pages/HomePage";
import { MyLocationsPage } from "../Pages/MyLocationsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Structure />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "my-locations",
        element: <MyLocationsPage />
      },
    ]
  }
]);