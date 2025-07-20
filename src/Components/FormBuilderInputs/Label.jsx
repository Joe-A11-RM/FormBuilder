import React from "react";

export default function Label({ item, activeInput }) {
  return (
    <>
      <p key={activeInput} style={item?.css}>
        {item?.title}
      </p>
    </>
  );
}
