import React from "react";
import StatsCard from "../../../../components/Tree/memberdash/Statscard";
import Header from "../../../../components/Tree/memberdash/header";
import PurchaseHistory from "../../../../components/Tree/memberdash/PurchaseHistory";
import DownlineMembers from "../../../../components/Tree/memberdash/Downline";
import ExpenseHistory from "../../../../components/Tree/memberdash/ExpenseTable";

export default function MemberDash() {
  return (
    <div className=" ">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatsCard
          title="Commission"
          amount="400"
          image="assets\commission.svg"
        />
        <StatsCard
          title="Referral Bonus"
          amount="200"
          image="assets\referal.svg"
        />
        <StatsCard
          title="Total Earnings"
          amount="600"
          image="assets\earnings.svg"
        />
        <StatsCard
          title="Wallet Balance"
          amount="250"
          image="assets\wallet.svg"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
        <div className="lg:col-span-3">
          <PurchaseHistory />
        </div>
        <div className="lg:col-span-2">
          <DownlineMembers />
        </div>
      </div>

      <div className="mt-4  ">
        <ExpenseHistory />
      </div>
    </div>
  );
}
