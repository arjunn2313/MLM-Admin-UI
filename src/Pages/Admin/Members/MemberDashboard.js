import React, { useEffect, useState } from "react";
import Header from "../../../components/Tree/memberdash/header";
import StatsCard from "../../../components/Tree/memberdash/Statscard";
import PurchaseHistory from "../../../components/Tree/memberdash/PurchaseHistory";
import DownlineMembers from "../../../components/Tree/memberdash/Downline";
import ExpenseHistory from "../../../components/Tree/memberdash/ExpenseTable";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import Spinners from "../../../components/placeholders/Spinners";
import ExpiryModal from "../../../components/modals/ExpiryModal";

export default function MemberDashboard() {
  const navigate = useNavigate();

  const [member, setMember] = useState();

  const { memberId } = useParams();
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
    <div className="m-3">
      {setSectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
        <MdOutlineKeyboardBackspace
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

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
        <div className="p-4 bg-white rounded-xl border-2 border-blue-400">
          <div className="flex items-center justify-between ">
            <h2 className="font-semibold text-lg mb-4 text-blue-500">
              Earning History
            </h2>
            <button
              className="border-2 border-blue-400 p-1 px-3 rounded-lg text-md text-blue-500"
              onClick={() => navigate(`expense`)}
            >
              View All
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-lg font-semibold text-gray-700">
                <th className="py-2">Sl. no.</th>
                <th className="py-2">Earning Date</th>
                <th className="py-2">Earning Type</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <tr key={index} className="border-t text-gray-700 ">
                  <td className="py-3">{item}</td>
                  <td className="py-3">01/07/2024</td>
                  <td className="py-3">Office Supplies</td>
                  <td className="py-3">Rs. 100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
