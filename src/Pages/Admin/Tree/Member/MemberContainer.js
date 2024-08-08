import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Member from "./Member";
import MemberDash from "./memberDash";
import ExpenseHis from "./ExpenseHis";

export default function MemberContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberView = searchParams.get("tree") || "table";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberView]);

  const renderContent = () => {
    switch (memberView) {
      case "table":
        return <Member />;

      case "dash":
        return <MemberDash />;

      case "history":
        return <ExpenseHis />;

      default:
        return null;
    }
  };

  return <div className="">{renderContent()}</div>;
}
