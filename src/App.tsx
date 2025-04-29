import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import HomePage from "./routes/HomePage.tsx";
import Detectron2 from "./routes/Detectron2.tsx";
import Navbar from "./elements/Navbar.tsx";

function App() {

  function Root() {
    return (
      <div className={"flex"}>
        <Navbar />
        <Outlet />
      </div>
    );
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div>Error Page</div>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "detectron2",
          element: <Detectron2 />
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
