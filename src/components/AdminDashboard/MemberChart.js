// import { Tooltip } from "recharts";
// import React, { useState } from "react";
// import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const weeklyData = [
//   { day: "Mon", amount: 100 },
//   { day: "Tue", amount: 250 },
//   { day: "Wed", amount: 150 },
//   { day: "Thu", amount: 200 },
//   { day: "Fri", amount: 50 },
//   { day: "Sat", amount: 150 },
//   { day: "Sun", amount: 100 },
// ];

// const monthlyData = [
//   { week: "Week 1", amount: 700 },
//   { week: "Week 2", amount: 800 },
//   { week: "Week 3", amount: 600 },
//   { week: "Week 4", amount: 900 },
// ];

// const yearlyData = [
//   { month: "Jan", amount: 1500 },
//   { month: "Feb", amount: 1800 },
//   { month: "Mar", amount: 1200 },
//   { month: "Apr", amount: 2000 },
//   { month: "May", amount: 1700 },
//   { month: "Jun", amount: 1900 },
//   { month: "Jul", amount: 1600 },
//   { month: "Aug", amount: 2100 },
//   { month: "Sep", amount: 1800 },
//   { month: "Oct", amount: 2300 },
//   { month: "Nov", amount: 2200 },
//   { month: "Dec", amount: 2400 },
// ];

// const MembersJoined = () => {
//   const [timePeriod, setTimePeriod] = useState("Week");

//   const handleChange = (e) => {
//     setTimePeriod(e.target.value);
//   };

//   let data, dataKey, yDomain;
//   if (timePeriod === "Week") {
//     data = weeklyData;
//     dataKey = "day";
//     yDomain = [0, 300];
//   } else if (timePeriod === "Month") {
//     data = monthlyData;
//     dataKey = "week";
//     yDomain = [0, 1000];
//   } else {
//     data = yearlyData;
//     dataKey = "month";
//     yDomain = [0, 2500];
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/4 mr-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-blue-600">Members Joined</h2>
//         <select className="p-2 border rounded" onChange={handleChange}>
//           <option value="Week">Week</option>
//           <option value="Month">Month</option>
//           <option value="Yearly">Yearly</option>
//         </select>
//       </div>
//       <div className="mt-6 h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid stroke="#E5E7EB" vertical={false} />
//             <XAxis dataKey={dataKey} axisLine={false} tickLine={false} />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#A9A9A9", fontSize: 12 }}
//               domain={yDomain}
//             />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="amount"
//               stroke="#FFA500"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default MembersJoined;

import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import { BaseUrl } from "../../App";
import { Config } from "../../utils/Auth";
import ExpiryModal from "../modals/ExpiryModal";
import Spinners from "../placeholders/Spinners";

const MembersJoined = () => {
  const [timePeriod, setTimePeriod] = useState("Week");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);

  const fetchData = async (period) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/dashboard/chart-data?period=${period}`,
        Config()
      );
      setData(response.data);
      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(timePeriod);
  }, [timePeriod]);

  const handleChange = (e) => {
    setTimePeriod(e.target.value);
  };

  let dataKey, yDomain, chartTitle;
  if (timePeriod === "Week") {
    dataKey = "day";
    yDomain = [0, 50];
    chartTitle = "Weekly Members Joined";
  } else if (timePeriod === "Month") {
    dataKey = "week";
    yDomain = [0, 1000];
    chartTitle = "Monthly Members Joined";
  } else {
    dataKey = "month";
    yDomain = [0, 1500];
    chartTitle = "Yearly Members Joined";
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/4 mr-6">
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-600">{chartTitle}</h2>
        <select
          className="p-2 border rounded"
          onChange={handleChange}
          value={timePeriod}
        >
          <option value="Week">Week</option>
          {/* <option value="Month">Month</option> */}
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="mt-6 h-64">
        {loading ? (
          <div><Spinners/></div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey={dataKey} axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A9A9A9", fontSize: 12 }}
                domain={yDomain}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FFA500"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MembersJoined;
