import { Calendar } from "antd";
import React from "react";

export default function AntCalendar({ style, item, id }) {
  return (
    <div style={item?.css}>
      <label
        htmlFor="calendar"
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
      <Calendar style={item.css} />
    </div>
  );
}
