import React from "react";

export default function AntHeader({ item, activeInput }) {
  return (
    <>
      <h4 key={activeInput} style={item?.css}>
        {item?.title}
      </h4>
    </>
  );
}
