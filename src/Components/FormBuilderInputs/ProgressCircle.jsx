import { Progress } from "antd";
import React from "react";

export default function ProgressCircle({ title, item }) {
  return (
    <div style={item?.css}>
      <label
        className="form-label d-block"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {title}
      </label>
      <Progress type="circle" percent={75} />
    </div>
  );
}
