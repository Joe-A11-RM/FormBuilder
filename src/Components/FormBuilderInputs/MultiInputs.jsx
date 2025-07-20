import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormDroppableFunctions from "../FormBuilder/FormCreation/FormDroppable/FormDroppableFunctions";
import { MdDragIndicator } from "react-icons/md";

function SortableContainerItem({
  item,
  index,
  getInputType,
  activeInput,
  setActiveInput,
  setDroppedItems,
  active,
  setActive,
  containerKey,
  allData,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task-item-${containerKey}-${item.key}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "4px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    opacity: isDragging ? 0.4 : 1,
    filter: isDragging ? "grayscale(100%)" : "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={async (e) => {
        e.stopPropagation();
        await setActiveInput(item?.key);
        setActive(true);
      }}
      className={
        activeInput === item?.key && active
          ? "task-form-inputs-active w-100"
          : "task-form-inputs w-100"
      }
    >
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", paddingRight: "8px" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          setActiveInput(item.key);
          setActive(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setActiveInput(item.key);
          setActive(true);
        }}
      >
        <MdDragIndicator size={20} />
      </div>
      <div className="w-100">{getInputType(item)}</div>
      {activeInput === item?.key && active && (
        <FormDroppableFunctions
          item={item}
          allData={allData}
          setDroppedItems={setDroppedItems}
          container={true}
          containerKey={containerKey}
        />
      )}
    </div>
  );
}

export default function Container({
  handleDragEnd,
  getInputType,
  container,
  setActiveInput,
  activeInput,
  css,
  active,
  containerKey,
  setDroppedItems,
  setActive,
  dropIndicatorIndex,
  dragDirection,
  childLevel,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `task-droppable-${containerKey}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        maxHeight: "calc(100vh - 121px)",
        border: "1px dashed gray",
        backgroundColor: isOver ? "#0f69361f" : "#fafafa",
        padding: "20px",
        width: "100%",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        ...css,
      }}
    >
      {container?.length === 0 ? (
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Drop Area
        </h4>
      ) : (
        container.map((item, index) => (
          <>
            {dropIndicatorIndex === index &&
              dragDirection === "up" &&
              childLevel && (
                <div
                  style={{
                    height: "2px",
                    backgroundColor: "#72777253",
                    margin: "2px 0",
                    width: "100%",
                    zIndex: "99999",
                  }}
                />
              )}
            <SortableContainerItem
              key={item.key}
              item={item}
              index={index}
              getInputType={getInputType}
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              setDroppedItems={setDroppedItems}
              active={active}
              setActive={setActive}
              containerKey={containerKey}
              allData={container}
            />
            {dropIndicatorIndex === index &&
              dragDirection === "down" &&
              childLevel && (
                <div
                  style={{
                    height: "2px",
                    backgroundColor: "#72777253",
                    margin: "2px 0",
                    width: "100%",
                    zIndex: "99999",
                  }}
                />
              )}
          </>
        ))
      )}
    </div>
  );
}
