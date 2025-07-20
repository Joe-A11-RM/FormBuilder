import React from "react";

export default function Link({ item, activeInput }) {
  const getValidUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <a
      key={activeInput}
      target="_blank"
      rel="noopener noreferrer"
      href={getValidUrl(item?.hyperLink)}
      style={item?.css}
    >
      {item?.title}
    </a>
  );
}
