import React from "react";
import DoubleValueProps from "./DoubleValueProps";

function DoubleValueCard({ title, key1, value1, key2, value2 }: DoubleValueProps) {
  return (
    <div className="card-1">
      <p className="card-header">{title}</p>
      <p className="card-key">{key1}:</p>
      <p className="card-value">{value1}</p>
      <br />
      <p className="card-key">{key2}:</p>
      <p className="card-value">{value2}</p>
    </div>
  );
}

export default DoubleValueCard;
