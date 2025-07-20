import React, { useState } from "react";
import { Input as AntdInput } from "antd";

export default function NormalInput({
  id,
  disabled,
  min,
  max,
  item,
  activeInput,
}) {
  const [value, setValue] = useState("");

  return (
    <div style={item?.css}>
      <label
        htmlFor={id}
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
        className="form-label d-flex align-items-center"
      >
        <div>{item?.title}</div>
        {item?.required?.value && value === "" && (
          <div className="text-danger ms-2">*</div>
        )}
      </label>
      <AntdInput
        type={item?.inputType}
        placeholder={item?.placeholder}
        id={item?.key}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{
          borderColor: item?.required?.value && value === "" ? "red" : "",
        }}
      />
      {item?.required?.value && value === "" && (
        <div className="text-danger mt-1">
          {item?.required?.validationMessage || "This field is required"}
        </div>
      )}
    </div>
  );
}
