import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function FormTree({
  collapsed,
  items,
  setActiveInput,
  setActive,
}) {
  const [openContainers, setOpenContainers] = useState({});

  const toggleContainer = (key) => {
    setOpenContainers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const setActiveField = (id) => {
    setActive(true);
    setActiveInput(id);
  };
  return (
    <div>
      {items.map((item) => (
        <React.Fragment key={item.key}>
          {item.name === "Container" ? (
            <>
              <div
                className="container-item d-flex align-items-center"
                onClick={() => setActiveField(item.key)}
              >
                <IoIosArrowDown
                  className="toggle-icon"
                  style={{
                    transform: `rotate(${
                      openContainers[item.key] ? "-90deg" : "0deg"
                    })`,
                    transition: "transform 0.2s ease",
                    marginRight: 8,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleContainer(item.key);
                  }}
                />
                <span className="item-key me-2">{item.key}</span>
                <span className="item-name">{item.name}</span>
              </div>

              {!openContainers[item.key] &&
                item.container.map((child) => (
                  <div
                    key={child.key}
                    className="child-item d-flex align-items-center ms-4"
                    onClick={() => setActiveField(child.key)}
                  >
                    <span className="item-key me-2">{child.key}</span>
                    <span className="item-name">{child.name}</span>
                  </div>
                ))}
            </>
          ) : (
            <div
              className="simple-item d-flex align-items-center"
              onClick={() => setActiveField(item.key)}
            >
              <span className="item-key me-2">{item.key}</span>
              <span className="item-name">{item.name}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
