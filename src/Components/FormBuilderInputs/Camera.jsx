import React, { useState } from "react";
import { IoCamera } from "react-icons/io5";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
export default function SnippetCamera({ item }) {
  const [camera, setCamera] = useState(false);
  return (
    <>
      <label
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
        htmlFor={item?.key || "camera"}
        className="form-label d-block"
      >
        {item?.title}
      </label>
      <IoCamera
        onClick={() => setCamera(!camera)}
        style={{ cursor: "pointer", height: "40px", width: "40px" }}
      />
      {camera && <Camera />}
    </>
  );
}
