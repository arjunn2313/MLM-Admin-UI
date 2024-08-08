import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import IncompletedList from "./IncompletedList";
import IncompleteTee from "./IncompleteTee";

export default function IncompletContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [treeView]);

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <IncompletedList />;
      case "incompletetree":
        return <IncompleteTee />;

      default:
        return null;
    }
  };
  return <div className="mt-5">{renderContent()}</div>;
}
