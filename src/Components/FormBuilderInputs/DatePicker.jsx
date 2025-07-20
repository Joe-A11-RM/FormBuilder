import { DatePicker } from "antd";
import React, { useState } from "react";

export default function AntDatePicker({ item, activeInput }) {
  const [value, setValue] = useState("");

  return (
    <div style={item?.css}>
      <label
        htmlFor={item?.key || "date-picker"}
        className="form-label d-flex align-items-center"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {item?.title}
        {item?.required?.value && value === "" && (
          <div className="text-danger ms-2">*</div>
        )}
      </label>
      <DatePicker
        key={activeInput}
        id={item?.key}
        style={{
          borderColor: item?.required?.value && value === "" ? "red" : "",
          width: "100%",
        }}
        onChange={(date, dateString) => setValue(dateString)}
      />
      {item?.required?.value && value === "" && (
        <div className="text-danger mt-1">
          {item?.required?.validationMessage || "This field is required"}
        </div>
      )}
    </div>
  );
}
