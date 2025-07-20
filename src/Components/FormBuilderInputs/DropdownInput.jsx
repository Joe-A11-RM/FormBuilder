import { Select } from "antd";
import React, { useState } from "react";

export default function DropdownInput({ id, item }) {
  const [value, setValue] = useState("");
  return (
    <div style={item?.css}>
      <label
        htmlFor={id}
        className="form-label d-flex align-items-center"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        <div>{item?.title}</div>
        {item?.required?.value && value === "" && (
          <div className="text-danger ms-2">*</div>
        )}
      </label>
      <Select
        allowClear
        style={{ width: "100%" }}
        placeholder={item?.placeholder}
        options={item?.dropdownOptions?.data}
      />
      {item?.required?.value && value === "" && (
        <div className="text-danger mt-1">
          {item?.required?.validationMessage || "This field is required"}
        </div>
      )}
    </div>
  );
}
