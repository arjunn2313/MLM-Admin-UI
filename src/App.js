import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/home/NavBar";
import Menu from "./components/home/Menu";
import adminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./Pages/Admin/Auth/AdminLogin";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import SignUp, { OTPAuthentication } from "./Pages/User/SignUp/SignUp";
import SignIn, { PasswordAssistance } from "./Pages/User/Login/Login";
import userRoutes from "./routes/UserRoutes";
import UserNavbar from "./components/User/Home/userNavbar";
import SidebarMenu from "./components/User/Home/userMenu";

export const BaseUrl = process.env.REACT_APP_BASE_URL;

// const Layout = ({ children }) => (
//   <div className="">
//     <Navbar />
//     <div className="main-container h-full bg-blue-50 ">
//       <div className="menu w-[21%] bg-white hidden lg:block mt-1">
//         <Menu />
//       </div>
//       <div className="content-container w-full">{children}</div>
//     </div>
//   </div>
// );

const Layout = ({ children }) => (
  <div className="">
    <Navbar />
    <div className="main-container h-full bg-blue-50 ">
      <div className="  bg-white hidden lg:block mt-1">
        <Menu />
      </div>
      <div className="content-container w-full">{children}</div>
    </div>
  </div>
);

const UserLayout = ({ children }) => (
  <div className="">
    <UserNavbar />
    <div className=" bg-blue-50 flex  h-full ">
      <div className="mt-1 flex h-fit  ">
        <SidebarMenu />
      </div>
      <div className=" w-full">{children}</div>
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
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: adminRoutes,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <UserLayout>
        <ProtectedRoute allowedRoles={["agent"]}>
          <Outlet />
        </ProtectedRoute>
      </UserLayout>
    ),
    children: [
      {
        element: <ProtectedRoute allowedRoles={["agent"]} />,
        children: userRoutes,
      },
    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/Authentication",
    element: <OTPAuthentication />,
  },
  {
    path: "/forgetPassword",
    element: <PasswordAssistance />,
  },
  {
    path: "/unauthorized",
    element: <div>Unauthorized Access</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
