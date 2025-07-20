import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function UISignature({ item, setDroppedItems }) {
  const signatureRef = useRef(null);

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleGetImage = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const dataURL = signatureRef.current.toDataURL("image/png");
      console.log("Signature as base64 PNG:", dataURL);
    }
  };
  const { border, ...divStylesWithoutBorder } = item?.css || {};
  const [value, setValue] = useState("");

  return (
    <div style={item?.css}>
      <label
        style={{
          color: item?.css?.color,
          fontFamily: item?.css?.fontFamily,
          fontSize: item?.css?.fontSize,
          fontWeight: item?.css?.fontWeight,
        }}
        htmlFor={item?.key || "signature"}
        className="form-label d-block"
      >
        <div className="d-flex align-items-center">
          {item?.title}
          {item?.required?.value && value === "" && (
            <div className="text-danger ms-2">*</div>
          )}
        </div>
      </label>
      <div>
        <SignatureCanvas
          ref={signatureRef}
          penColor="green"
          canvasProps={{
            width: item?.css?.width ? item?.css?.width : 500,
            height: 200,
            className: "sigCanvas",
            style: { border: "1px solid #ccc" },
          }}
        />
        {item?.required?.value && value === "" && (
          <div className="text-danger mt-1">
            {item?.required?.validationMessage || "This field is required"}
          </div>
        )}
      </div>

      {/**<div style={{ marginTop: 10 }}>
				<button onClick={handleClear}>Clear</button>
				<button onClick={handleGetImage} style={{ marginLeft: 10 }}>
					Get Image
				</button>
			</div>**/}
    </div>
  );
}
