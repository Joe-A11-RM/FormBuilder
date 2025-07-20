import React from "react";
import { FaArrowDown, FaArrowUp, FaRegClone, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

export default function FormDroppableFunctions({
  item,
  allData,
  setDroppedItems,
  container,
  containerKey,
}) {
  const uuid = uuidv4().slice(0, 8);
  const combinedItem = {
    key: `${item.name?.toLowerCase().replace(/\s+/g, "-")}-${uuid}`,
    name: item?.name,
    title: item?.name,
    placeholder: null,
    css: {},
    required: { value: false, validationMessage: "" },
    radioOptions:
      item?.name === "Radio group"
        ? [
            { value: 1, label: "Option A" },
            { value: 2, label: "Option B" },
            { value: 3, label: "Option C" },
          ]
        : [],
    dropdownOptions:
      item?.name === "Dropdown"
        ? {
            queryKey: "static",
            data: [
              { value: 1, label: "Option A" },
              { value: 2, label: "Option B" },
              { value: 3, label: "Option C" },
            ],
          }
        : null,
    btnType: item?.name === "Button" ? "button" : null,
    hyperLink: null,
    imgPath: null,
    container: [],
  };
  const getIndex = () => {
    return allData.findIndex((i) => i.key === item?.key);
  };

  const removeInput = () => {
    const index = getIndex();
    if (index === -1) return;
    if (container) {
      setDroppedItems((prev) => {
        const updated = [...prev];
        updated.map(
          (i) => i.key === containerKey && i.container.splice(index, 1)
        );
        return updated;
      });
    } else {
      setDroppedItems((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
  };

  const cloneInput = () => {
    const index = getIndex();
    if (container) {
      setDroppedItems((prev) => {
        const updated = [...prev];
        updated.map(
          (i) =>
            i.key === containerKey &&
            i.container.splice(index + 1, 0, combinedItem)
        );
        return updated;
      });
    } else {
      setDroppedItems((prev) => {
        const updated = [...prev];
        updated.splice(index + 1, 0, combinedItem);
        return updated;
      });
    }
  };
  const moveForward = (key) => {
    const index = getIndex();
    setDroppedItems((prev) => {
      if (index === -1) return prev;
      const updated = prev.filter((item) => item !== key);
      updated.splice(index + 1, 0, key);
      return updated;
    });
  };
  const moveBackward = (key) => {
    setDroppedItems((prev) => {
      const index = getIndex();
      if (index === -1) return prev;
      const updated = prev.filter((item) => item !== key);
      updated.splice(index - 1, 0, key);
      return updated;
    });
  };
  return (
    <div className="task-droppable-functions">
      <div>{item?.key}</div>
      <FaTrash onClick={removeInput} cursor="pointer" title="delete" />
      <FaRegClone onClick={cloneInput} cursor="pointer" title="clone" />
    </div>
  );
}
