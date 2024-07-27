import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tree from "../../../components/Tree/IncompleteTree";
import MemberDash from "../Tree/Member/memberDash";
import Header from "../../../components/Tree/memberdash/header";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BaseUrl } from "../../../App";
import axios from "axios";
import { Config } from "../../../utils/Auth";
import Spinners from "../../../components/placeholders/Spinners";

export default function IncompleteTree() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);

  useEffect(() => {
    fetchAgentData();
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
    <div className="m-3 h-screen overflow-hidden ">
      <div className="flex items-center space-x-8">
        <MdOutlineKeyboardBackspace
          size={30}
          className="my-3 text-gray-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-xl text-blue-500 font-medium roboto-c">
          Incomplete Tree
        </span>
      </div>
      <div className="mb-3">
        <Header member={member} />
      </div>
      <div className="bg-white w-full p-3 flex gap-10 rounded">
        <div className="flex flex-col px-10 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member ID :</span>{" "}
            <span className="text-custom-orange">{memberId}</span>
          </span>
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-orange">{member?.name}</span>
          </span>
        </div>

        <div className="flex flex-col px-10 border-l border-blue-500 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Completed :</span>{" "}
            <span className="text-green-600">0{member?.children?.length} </span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Incomplete :</span>{" "}
            <span className="text-custom-pink">
              0{5 - member?.children?.length}
            </span>
          </span>
        </div>
      </div>

      <Tree member={memberId} />
    </div>
  );
}
