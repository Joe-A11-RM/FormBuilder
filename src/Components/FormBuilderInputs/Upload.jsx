import { Button, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function AntUpload({ item }) {
  return (
    <div style={item?.css}>
      <label
        htmlFor={item?.key}
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
      <Upload id={item?.key}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
}
