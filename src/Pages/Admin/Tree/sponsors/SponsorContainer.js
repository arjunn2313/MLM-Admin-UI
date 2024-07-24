import React from "react";
import { useSearchParams } from "react-router-dom";
import Sponsors from "./Sponsors";
import SponsorTree from "./SponsorTree";

export default function SponsorContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <Sponsors />;
      case "sponsortree":
        return <SponsorTree />;

      default:
        return null;
    }
  };

  return <div className="mt-5">{renderContent()}</div>;
}
