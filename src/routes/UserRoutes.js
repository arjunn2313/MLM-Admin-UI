import AgentPreview from "../Pages/User/Registration/Preview";
import RegForm from "../Pages/User/Registration/RegForm";
import TermsAndCondition from "../Pages/User/Registration/TermsAndCondition";

const userRoutes = [
  {
    path: "register",
    children: [
      { path: "form", element: <RegForm /> },
      { path: "form/terms-and-condition", element: <TermsAndCondition /> },
      { path: "preview/:memberId", element: <AgentPreview /> },
    ],
  },
];

export default userRoutes;
