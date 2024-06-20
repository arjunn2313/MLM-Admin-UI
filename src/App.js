import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Tree from "./Pages/Tree/Tree";
import Navbar from "./components/home/NavBar";
import Menu from "./components/home/Menu";
import Member from "./Pages/Members/Member";
import Preview from "./Pages/Register/Preview";
import RegisterTable from "./Pages/Register/RegisterTable";
import Sponsors from "./Pages/Tree/Sponsors";
import Downlinemember from "./Pages/Tree/Downline-member";

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="main-container h-full bg-blue-50">
          <div className="menu w-[21%] bg-white sm:block mt-1">
            <Menu />
          </div>
          <div className="content-container w-full">
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
          element: <RegisterTable />,
          children: [
            {
              path: "form",
              element: <Register />,
            },
          ],
        },
        {
          path: "/form",
          element: <Register />,
        },
        {
          path: "/tree",
          element: <Tree />,
        },
        {
          path: "/sponsors",
          element: <Sponsors />,
        },
        {
          path: "/downline-member",
          element: <Downlinemember />,
        },
        {
          path: "/members",
          element: <Member />,
        },
        {
          path: "/preview/:memberId",
          element: <Preview />,
        },
      ],
    },
  ]);
  

  return <RouterProvider router={router} />;
}

export default App;
