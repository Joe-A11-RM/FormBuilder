import { Switch } from "antd";
import React from "react";

export default function Toggle({ item }) {
  return (
    <div style={item?.css}>
      <label
        htmlFor="toggle"
        className="form-label me-2"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {item?.title}
      </label>
      <Switch defaultChecked />
    </div>
  );
}
