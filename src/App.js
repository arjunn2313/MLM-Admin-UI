import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Tree from "./Pages/Tree/Tree";
import Navbar from "./components/home/NavBar";
import Menu from "./components/home/Menu";
import Member from "./Pages/Members/Member";
import Preview from "./Pages/Register/Preview";
import RegisterTable from "./Pages/Register/RegisterTable";
import Downlinemember from "./Pages/Tree/Downline/Downline-member";
import UpdateMember from "./Pages/Register/MemberEdit";
import District from "./Pages/Tree/district";
import Report from "./Pages/reports/Report";
import SectionTable from "./Pages/Tree/Section";
import Section from "./Pages/Tree/Section";
import TreeForm from "./Pages/Tree/Tree-form";
import TreeTabContainer from "./Pages/Tree/TreeTabContainer";
import Sponsors from "./Pages/Tree/sponsors/Sponsors";
import SponsorTree from "./Pages/Tree/sponsors/SponsorTree";
import MemberDashboard from "./Pages/Members/MemberDashboard";
import MemberExpense from "./Pages/Members/MemberExpense";
import Commission from "./Pages/Wallet/Commission/Commission";
import Referal from "./Pages/Wallet/Referal/Referal";
import Settings from "./Pages/Wallet/Settings/Settings";
import CashDebit from "./components/payout";

// Define Layout component to avoid repetition
const Layout = ({ children }) => (
  <div className="">
    <Navbar />
    <div className="main-container h-full bg-blue-50 ">
      <div className="menu w-[21%] bg-white hidden lg:block    mt-1">
        <Menu />
      </div>
      <div className="content-container w-full  ">{children}</div>
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
        element: <District />,
      },
      {
        path: "district/:name/:districtId",
        element: <Section />,
      },
      {
        path: "district/:name/:districtId/new-tree",
        element: <TreeForm />,
      },
      {
        path: "district/:name/:districtId/tree/:treeId/:headId/:treeName",
        element: <TreeTabContainer />,
      },
    ],
  },
  {
    path: "/members",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <Member />,
      },
      {
        path: ":id",
        element: <MemberDashboard />,
      },
      {
        path: ":id/expense",
        element: <MemberExpense />,
      },
    ],
  },
  {
    path: "/wallet",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "commission",
        element: <Commission />,
      },
      {
        path: "referal",
        element: <Referal />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/reports",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <CashDebit />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
