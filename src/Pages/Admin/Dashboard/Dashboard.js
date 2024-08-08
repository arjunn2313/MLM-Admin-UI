import React, { useEffect, useState } from "react";
import HeaderStats from "../../../components/AdminDashboard/HeadStats";
import MembersJoined from "../../../components/AdminDashboard/MemberChart";
import DistrictHeads from "../../../components/AdminDashboard/DistrictHead";
import MembersList from "../../../components/AdminDashboard/MemberList";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import axios from "axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const stats = [
    { title: "Total Members", count: 1500 },
    { title: "Total Trees", count: 25 },
    { title: "Total Districts", count: 5 },
    { title: "Incomplete Trees", count: 30 },
  ];
  const [count, setCount] = useState({
    totalMembers: 0,
    totalTrees: 0,
    totalDistrict: 0,
    incomplete: 0,
  });

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/dashboard/count-data`,
        Config()
      );
      setCount({
        totalMembers: response.data.approvedAgentCount,
        totalTrees: response.data.treesCount,
        totalDistrict: response.data.districtCount,
        incomplete: response.data.incompleteTreeCount,
      });
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <HeaderStats
          isLoading={loading}
          color="border-orange-500"
          stat={stats[0]}
          count={count.totalMembers}
          icon="assets\members.png"
        />
        <HeaderStats
          isLoading={loading}
          color="border-purple-500"
          stat={stats[1]}
          count={count.totalTrees}
          icon="assets\total tree.png"
        />
        <HeaderStats
          isLoading={loading}
          color="border-blue-500"
          stat={stats[2]}
          count={count.totalDistrict}
          icon="assets\dashDistrict.png"
        />
        <HeaderStats
          isLoading={loading}
          color="border-violet-500"
          stat={stats[3]}
          count={count.incomplete}
          icon="assets\DashTree.png"
        />
      </div>
      <div className="flex flex-col lg:flex-row mt-6">
        <MembersJoined />
        <DistrictHeads />
      </div>
      <MembersList />
    </div>
  );
}
