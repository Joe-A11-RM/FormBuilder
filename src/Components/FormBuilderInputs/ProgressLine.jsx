import { Progress } from "antd";
import React from "react";

export default function ProgressLine({ title, item }) {
  return (
    <div style={item?.css}>
      <label
        className="form-label"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {title}
      </label>
      <Progress percent={30} />
    </div>
  );
}
