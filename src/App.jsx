import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Owner from "./components/Owner";
import Home from "./Home";
import Navbar from "./components/Navbar";


const router = createBrowserRouter([

  {

    path: "/",
    element: <Home />,
  },
  {
    path: "/owner",
    element: <Owner />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
