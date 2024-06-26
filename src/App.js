import { Outlet, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
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
import UpdateMember from "./Pages/Register/MemberEdit";
import District from "./Pages/Tree/district";
import Settings from "./Pages/settings/Settings";
import Report from "./Pages/reports/Report";


// Define Layout component to avoid repetition
const Layout = ({ children }) => (
  <div>
    <Navbar />
    <div className="main-container h-full bg-blue-50">
      <div className="menu w-[21%] bg-white sm:block mt-1">
        <Menu />
      </div>
      <div className="content-container w-full">{children}</div>
    </div>
  </div>
);

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sponsors",
        element: <Sponsors />,
      },
      {
        path: "downline-member",
        element: <Downlinemember />,
      },
    ],
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <RegisterTable />,
      },
      {
        path: "form",
        element: <Register />,
      },
      {
        path: "preview/:memberId",
        element: <Preview />,
      },
      {
        path: "update/:memberId",
        element: <UpdateMember />,
      },
    ],
  },
  {
    path: "tree",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "district",
        element: <District/>,
      },
    ],
  },
  {
    path: "/members",
    element: (
      <Layout>
        <Outlet/>
      </Layout>
    ),
    children:[
      {
        path : "",
        element:<Member/>
      }
    ]
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <Outlet/>
      </Layout>
    ),
    children:[
      {
        path : "",
        element:<Settings/>
      }
    ]
  },
  {
    path: "/reports",
    element: (
      <Layout>
        <Outlet/>
      </Layout>
    ),
    children:[
      {
        path : "",
        element:<Report/>
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
