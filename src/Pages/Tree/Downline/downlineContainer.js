import React from "react";
import { useSearchParams } from "react-router-dom";
import Downlinemember from "./Downline-member";
import DownlineTree from "./DownlineTree";

export default function DownlineContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <Downlinemember/>;
      case "downlinetree":
        return <DownlineTree />;

      default:
        return null;
    }
  };

  return <div className="mt-5">{renderContent()}</div>;
}
