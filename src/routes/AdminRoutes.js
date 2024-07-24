 
import Register from "../Pages/Admin/Register/Register";
import Tree from "../Pages/Admin/Tree/Tree";
 
import Member from "../Pages/Admin/Members/Member";
import Preview from "../Pages/Admin/Register/Preview";
import RegisterTable from "../Pages/Admin/Register/RegisterTable";
import Downlinemember from "../Pages/Admin/Tree/Downline/Downline-member";
import UpdateMember from "../Pages/Admin/Register/MemberEdit";
import Report from "../Pages/Admin/reports/Report";
// import SectionTable from "./Pages/Admin/Tree/Section";
import Sponsors from "../Pages/Admin/Tree/sponsors/Sponsors";
// import SponsorTree from "./Pages/Tree/sponsors/SponsorTree";
import MemberDashboard from "../Pages/Admin/Members/MemberDashboard";
import MemberExpense from "../Pages/Admin/Members/MemberExpense";
import Commission from "../Pages/Admin/Wallet/Commission/Commission";
import Referal from "../Pages/Admin/Wallet/Referal/Referal";
import Settings from "../Pages/Admin/Wallet/Settings/Settings";
import CashDebit from "../components/payout";
import TermsAndCondition from "../Pages/Admin/Register/Terms&Condition";
import MemberPreview from "../Pages/Admin/Register/memberPreview";
import District from "../Pages/Admin/Tree/district";
import Section from "../Pages/Admin/Tree/Section";
import TreeForm from "../Pages/Admin/Tree/Tree-form";
import HeadTerms from "../Pages/Admin/Tree/HeadTerms";
import TreeTabContainer from "../Pages/Admin/Tree/TreeTabContainer";
import Home from "../Pages/Admin/Home/Home";

const adminRoutes = [
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
  {
    path: "register",
    children: [
      { path: "", element: <RegisterTable /> },
      { path: "form", element: <Register /> },
      { path: "form/terms-and-condition", element: <TermsAndCondition /> },
      { path: "form/terms-and-condition/preview", element: <Preview /> },
      { path: "form/terms-and-condition/update", element: <UpdateMember /> },
      { path: "preview/:memberId", element: <MemberPreview /> },
      { path: "update/:memberId", element: <UpdateMember /> },
    ],
  },
  {
    path: "tree",
    children: [
      { path: "district", element: <District /> },
      { path: "district/:name/:districtId", element: <Section /> },
      { path: "district/:name/:districtId/new-tree", element: <TreeForm /> },
      {
        path: "district/:name/:districtId/new-tree/terms-and-condition",
        element: <HeadTerms />,
      },
      {
        path: "district/:name/:districtId/tree/:treeId/:headId/:treeName",
        element: <TreeTabContainer />,
      },
    ],
  },
  {
    path: "incomplete-tree",
    children: [
      { path: "", element: <Member /> },
      { path: ":id/tree-view", element: <MemberDashboard /> },
    ],
  },
  {
    path: "completed-tree",
    children: [
      { path: "", element: <Member /> },
      { path: ":id/tree-view", element: <MemberDashboard /> },
    ],
  },
  {
    path: "members",
    children: [
      { path: "", element: <Member /> },
      { path: ":id", element: <MemberDashboard /> },
      { path: ":id/expense", element: <MemberExpense /> },
    ],
  },
  {
    path: "wallet",
    children: [
      { path: "commission", element: <Commission /> },
      { path: "referal", element: <Referal /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "reports",
    children: [{ path: "", element: <CashDebit /> }],
  },
];

export default adminRoutes;
