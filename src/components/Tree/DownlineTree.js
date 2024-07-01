import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { PiUserCircleLight } from "react-icons/pi";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import axios from "axios";

import "./binaryTree.css";
import { BaseUrl } from "../../request/URL";
import CustomPopover from "../Helpers/PopOver";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Spinners from "../placeholders/Spinners";

export default function DownlineTree({ member }) {
  const treeContainer = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [treeData, setTreeData] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const { headId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreeData();
  }, [member]);

  const fetchTreeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/agent/tree-node-tree/${member}`
      );
      setTreeData(response.data);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async (parentId) => {
    alert(parentId);
    navigate(`/register/form/?sponsorId=${parentId}`);
  };

  const renderNode = ({ nodeDatum }) => {
    const childrenCount = nodeDatum.children ? nodeDatum.children.length : 0;
    const width = 200;
    const startX = -((childrenCount - 1) * width) / 2;
    const stepX = width;

    const handleMouseOver = (event) => {
      setIsPopoverOpen(true);
      setPopoverContent(nodeDatum); // Replace with actual content

      // Calculate center of the circle
      const circleRect = event.target.getBoundingClientRect();
      const centerX = circleRect.left + circleRect.width / 2;
      const centerY = circleRect.top + circleRect.height / 2;

      // Set popover position
      setPopoverPosition({
        x: centerX - 120,
        y: centerY + window.scrollY + 30, // Adjust as per your design
      });
    };

    const handleMouseOut = () => {
      setIsPopoverOpen(false);
    };

    if (nodeDatum.isAddButton) {
      return (
        <g onClick={() => handleAddChild(nodeDatum.parentId)}>
          <circle r={30} stroke="#8b5e34" />
          <foreignObject x="-15" y="-15" width="30" height="30">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <FaPlus
                style={{
                  width: "80%",
                  height: "80%",
                  color: "rgba(170, 91, 23, 1)",
                }}
              />
            </div>
          </foreignObject>

          <text
            fill="rgba(170, 91, 23, 1)"
            x="0"
            y="55"
            textAnchor="middle"
            strokeWidth="0"
          >
            Add
          </text>
        </g>
      );
    }

    return (
      <g>
        <circle
          r={30}
          fill="#007bff16"
          stroke="#007bff"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <foreignObject x="-15" y="-15" width="30" height="30">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <PiUserCircleLight
              style={{ width: "100%", height: "100%", color: "#007bff" }}
              size={50}
            />
          </div>
        </foreignObject>
        <rect
          x={-50}
          y={40}
          width={100}
          height={20}
          strokeWidth="0"
          fill="#007bff"
          rx={5}
          ry={5}
        />
        <text fill="#fff" x="0" y="55" textAnchor="middle" strokeWidth="0">
          {nodeDatum.name}
        </text>

        {nodeDatum.children &&
          nodeDatum.children.map((child, index) => (
            <g
              key={child.name}
              transform={`translate(${startX + index * stepX}, 120)`}
            >
              <Tree
                data={{ name: child.name }}
                orientation="vertical"
                translate={{ x: 0, y: 0 }}
                pathFunc={() => ""}
                renderCustomNodeElement={renderNode}
                zoom={zoom}
                zoomable={false}
                collapsible={false}
                initialDepth={0}
                separation={{ siblings: 1, nonSiblings: 2 }}
                pathClassFunc={() => "tree-link"}
              />
            </g>
          ))}
      </g>
    );
  };

  const pathFunc = (linkInfo) => {
    const { source, target } = linkInfo;
    const verticalGap = 100;
    const labelOffsetY = 60;

    return `
      M ${source.x},${source.y + labelOffsetY}
      V ${source.y + verticalGap}
      H ${target.x}
      V ${target.y - 30}
    `;
  };

  const handleZoomIn = () => {
    setZoom(zoom * 1.1);
  };

  const handleZoomOut = () => {
    setZoom(zoom * 0.9);
  };

  if (loading) {
    return (
      <div className="h-20 flex items-center justify-center">
        <Spinners />
      </div>
    );
  }

  return (
    <div className="  h-screen    bg-white mt-3 tree-container">
      {isPopoverOpen && (
        <CustomPopover
          posX={popoverPosition.x}
          posY={popoverPosition.y}
          content={popoverContent}
        />
      )}

      <div className=" flex items-end justify-end p-2 gap-8  ">
        <div className="shadow-lg p-3 flex rounded-full">
          <button onClick={handleZoomIn} className="p-1">
            <CiZoomIn size={25} color="#007bff" />
          </button>
          <button onClick={handleZoomOut} className="border-l p-1">
            <CiZoomOut size={25} color="#007bff" />
          </button>
        </div>

        <div className="shadow-lg p-3 flex rounded-full">
          <TfiReload
            size={25}
            color="#007bff"
            onClick={() => fetchTreeData()}
            className="cursor-pointer"
          />
        </div>
      </div>

      {treeData && (
        <Tree
          ref={treeContainer}
          data={treeData}
          orientation="vertical"
          pathFunc={pathFunc}
          translate={{ x: window.innerWidth / 2, y: 50 }}
          separation={{ siblings: 1, nonSiblings: 2 }}
          renderCustomNodeElement={renderNode}
          zoom={zoom}
          zoomable={true}
          collapsible={false}
          initialDepth={undefined}
          pathClassFunc={() => "tree-link"}
        />
      )}
    </div>
  );
}
