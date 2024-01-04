import React from "react";
import "./CommandCell.css";

const CommandCell = ({ command }) => {
  return (
    <div className="command">
      <div className="square">
        <span className="text">{command}</span>
      </div>
    </div>
  );
};

export default CommandCell;
