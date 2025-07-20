import { Input, Radio } from "antd";
import React, { useState } from "react";

export default function RadioGroup({ item }) {
  const [value, setValue] = useState();
  const [customInput, setCustomInput] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Convert dynamic options to valid structure
  const dynamicOptions =
    Array.isArray(item?.radioOptions) && item.radioOptions.length > 0
      ? item.radioOptions.map((opt, index) => ({
          label: opt.label || `Option ${index + 1}`,
          value: opt.value || opt.label || index + 1,
        }))
      : [
          { value: 1, label: "Option A" },
          { value: 2, label: "Option B" },
          { value: 3, label: "Option C" },
        ];

  // Add custom "More..." option at the end
  const options = [
    ...dynamicOptions,
    {
      value: "more",
      label: (
        <>
          More...
          {value === "more" && (
            <Input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="please input"
              style={{ width: 120, marginInlineStart: 12 }}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div style={item?.css}>
      <label
        htmlFor={item?.key || "radio-group"}
        className="form-label"
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
      >
        {item?.title}
      </label>
      <Radio.Group
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
        onChange={handleChange}
        value={value}
        options={options}
      />
    </div>
  );
}
