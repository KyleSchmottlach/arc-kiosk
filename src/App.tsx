import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import HomePage from "./routes/HomePage.tsx";
import Navbar from "./elements/Navbar.tsx";

function App() {

  function Root() {
    return (
      <>
        <Navbar />
        <main className={"relative pt-4 pb-4 top-nav-height left-0 w-screen h-screen-height-nav"}>
          <Outlet />
        </main>
      </>
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
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
