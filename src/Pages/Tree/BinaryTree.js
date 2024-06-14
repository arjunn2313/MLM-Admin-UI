import React, { useRef, useState } from "react";
import Tree from "react-d3-tree";
import "./binaryTree.css";
import { PiUserCircleLight } from "react-icons/pi";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";

export default function BinaryTree() {
  const treeContainer = useRef(null);
  const [zoom, setZoom] = useState(1);

  const treeData = {
    name: "ID202401",
    children: [
      {
        name: "ID202402",
        children: [{ name: "ID202407" }, { name: "ID202408" }],
      },
      {
        name: "ID202403",
        children: [{ name: "ID202409" }, { name: "ID202410" }],
      },
      {
        name: "ID202404",
        children: [{ name: "ID202411" }],
      },
      { name: "ID202405" },
      {
        name: "ID202406",
        children: [{ name: "ID202412" }, { name: "ID202413" },],
      },
    ],
  };

  const renderNode = ({ nodeDatum }) => (
    <g>
      {/* Circle */}
      <circle r={30} fill="#007bff16" stroke="#007bff" />

      {/* Icon */}
      <foreignObject x="-15" y="-15" width="30" height="30">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <PiUserCircleLight
            style={{ width: "100%", height: "100%", color: "#007bff" }}
            size={50}
          />
        </div>
      </foreignObject>

      {/* Background rectangle for text */}
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

      {/* Text */}
      <text fill="#fff" x="0" y="55" textAnchor="middle" strokeWidth="0">
        {nodeDatum.name}
      </text>
    </g>
  );

    const pathFunc = (linkInfo) => {
      const { source, target } = linkInfo;
      const verticalGap = 100; // Adjust this value to set the gap size
      const circleRadius = 30; // Adjust this value to match your circle radius

      return `
        M ${source.x},${source.y}
        V ${source.y + verticalGap}
        H ${target.x}
        V ${target.y - circleRadius}
      `;
    };

 

  const handleZoomIn = () => {
    setZoom(zoom * 1.1); // Increase zoom factor (adjust as needed)
  };

  const handleZoomOut = () => {
    setZoom(zoom * 0.9); // Decrease zoom factor (adjust as needed)
  };

  return (
    <div className="h-screen bg-white mt-3 tree-container">
      <div className="flex items-end justify-end p-2 gap-8">
        <div className="shadow-lg p-3 flex rounded-full">
          <button onClick={handleZoomIn} className="p-1">
            <CiZoomIn size={25} color="#007bff" />
          </button>
          <button onClick={handleZoomOut} className="border-l p-1">
            <CiZoomOut size={25} color="#007bff" />
          </button>
        </div>

        <div className="shadow-lg p-3 flex rounded-full">
          <TfiReload size={25} color="#007bff" />
        </div>
      </div>

      <Tree
        ref={treeContainer}
        data={treeData}
        orientation="vertical"
        pathFunc={pathFunc}
        translate={{ x: 200, y: 50 }} // Optional: Adjust position of the tree
        separation={{ siblings: 2, nonSiblings: 2 }} // Optional: Adjust spacing between nodes
        renderCustomNodeElement={renderNode}
        zoom={zoom}
        zoomable={true}
        collapsible={false} // Optional: Disable node collapsing
        initialDepth={2} // Optional: Adjust initial depth of the tree
        pathClassFunc={() => "tree-link"}
      />
    </div>
  );
}
