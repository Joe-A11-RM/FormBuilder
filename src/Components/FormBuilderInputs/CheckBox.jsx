import { Checkbox } from "antd";
import React from "react";

export default function AntCheckBox({ item, activeInput }) {
  return (
    <div style={item?.css}>
      <Checkbox
        key={activeInput}
        className="form-label"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {item?.title}
      </Checkbox>
    </div>
  );
}
