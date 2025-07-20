import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

export default function AntTextArea({
  title,
  id,
  type,
  placeholder,
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
        htmlFor={item?.key}
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
      <TextArea
        type={item?.title}
        placeholder={item?.placeholder}
        id={item?.key}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{
          borderColor: item?.required?.value && value === "" ? "red" : "",
        }}
        rows={4}
      />
      {item?.required?.value && value === "" && (
        <div className="text-danger mt-1">
          {item?.required?.validationMessage || "This field is required"}
        </div>
      )}
    </div>
  );
}
