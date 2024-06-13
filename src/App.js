import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Tree from "./Pages/Tree/Tree";
import Navbar from "./components/home/NavBar";
import Menu from "./components/home/Menu";
import Member from "./Pages/Members/Member";
import Preview from "./Pages/Register/Preview";

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="main-container  h-full bg-blue-50">
          <div className="menu w-[15%] bg-white sm:block mt-1">
            <Menu />
          </div>
          <div className="content-container w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/tree",
          element: <Tree />,
        },
        {
          path: "/members",
          element: <Member />,
        },
        {
          path: "/preview",
          element: <Preview />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
