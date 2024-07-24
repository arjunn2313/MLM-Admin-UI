import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { BaseUrl } from "../../../../request/URL";

export default function SetCommission() {
  const [commissions, setCommissions] = useState([]);
  const [referralCommission, setReferralCommission] = useState();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/settings`);
      setCommissions(response.data.levelCommissions);
      setReferralCommission(response.data.referralCommission);
    } catch (err) {
      setError("Failed to fetch commission data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddValue = () => {
    setCommissions([...commissions, { level: "", amount: "" }]);
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await axios.post(`${BaseUrl}/settings/update`, {
        referralCommission: Number(referralCommission),
        levelCommissions: commissions.map((c) => ({
          level: Number(c.level),
          amount: Number(c.amount),
        })),
      });
      alert("Settings updated successfully");
    } catch (err) {
      setError("Failed to save changes.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSaving(true);
      const response = await axios.delete(`${BaseUrl}/settings/delete/${id}`);
      alert("Commission deleted successfully");
      fetchCommissions();
    } catch (err) {
      setError("Failed to delete commission.");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="rounded h-full">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Commission per person
        </h2>

        <input
          type="text"
          className="border-2 border-blue-400 rounded-lg p-2 w-80 mb-4"
          value={referralCommission}
          onChange={(e) => setReferralCommission(e.target.value)}
        />

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Set level wise commission
        </h2>
        {commissions.map((commission, index) => (
          <div
            key={index}
            className="flex items-center space-x-5 space-y-2 w-[90%] mb-2"
          >
            <input
              type="text"
              className="border-2 border-blue-400 rounded-lg p-2 w-full"
              value={commission.level}
              onChange={(e) => {
                const newCommissions = [...commissions];
                newCommissions[index].level = e.target.value;
                setCommissions(newCommissions);
              }}
              placeholder="Level"
            />
            <input
              type="text"
              className="border-2 border-blue-400 rounded-lg p-2 w-full"
              value={commission.amount}
              onChange={(e) => {
                const newCommissions = [...commissions];
                newCommissions[index].amount = e.target.value;
                setCommissions(newCommissions);
              }}
              placeholder="Commission Amount (Rs)"
            />

            <button
              className="text-red-500 flex items-center justify-center gap-3"
              onClick={() => handleDelete(commission._id)}
            >
              <RiDeleteBin6Line />
              {saving ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 mb-4 font-medium underline text-md"
          onClick={handleAddValue}
        >
          + Add values
        </button>
      </div>

      <div className="bg-white mt-3 p-10 rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Cash Debit</h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="levelwise-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="levelwise-debit" className="text-gray-700 text-lg">
              Level Wise Debit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="weekly-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="weekly-debit" className="text-gray-700 text-lg">
              Weekly Debit
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="immediate-debit"
              className="mr-5 border-blue-500 border-2 focus:ring-0 rounded"
            />
            <label htmlFor="immediate-debit" className="text-gray-700 text-lg">
              Immediate Debit
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end py-5 space-x-4">
        <button
          className="text-red-500 font-medium px-4 py-2 rounded-lg text-lg"
          onClick={() => window.location.reload()}
        >
          Discard
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg"
          onClick={handleSaveChanges}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
