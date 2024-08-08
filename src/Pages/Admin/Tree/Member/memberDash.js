import React, { useEffect, useState } from "react";
import StatsCard from "../../../../components/Tree/memberdash/Statscard";
import Header from "../../../../components/Tree/memberdash/header";
import PurchaseHistory from "../../../../components/Tree/memberdash/PurchaseHistory";
import DownlineMembers from "../../../../components/Tree/memberdash/Downline";
import ExpenseHistory from "../../../../components/Tree/memberdash/ExpenseTable";
import { useParams, useSearchParams } from "react-router-dom";
import ExpiryModal from "../../../../components/modals/ExpiryModal";
import Spinners from "../../../../components/placeholders/Spinners";
import axios from "axios";
import { BaseUrl } from "../../../../App";
import { Config } from "../../../../utils/Auth";

export default function MemberDash() {
  const [member, setMember] = useState();
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);

  useEffect(() => {
    fetchAgentData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchAgentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BaseUrl}/api/admin/agent/agent-preview/${memberId}`,
        Config()
      );
      setMember(res.data);
    } catch (error) {
      setError(error);
      if (error.response.status === 403) {
        setSectionExpired(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinners />;
  }

  return (
    <div className=" ">
      {setSectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <Header member={member} />
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
        <ExpenseHistory member={member} />
      </div>
    </div>
  );
}
