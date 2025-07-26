import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormDroppableFunctions from "./FormDroppableFunctions";
import { MdDragIndicator } from "react-icons/md"; // optional drag icon

export default function FormContainerDroppableItems({
	item,
	getInputType,
	activeInput,
	setActiveInput,
	setDroppedItems,
	active,
	setActive,
	allItems,
	isGhost,
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: item.key,
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
			onClick={(e) => {
				e.stopPropagation();
				setActiveInput(item.key);
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
			{activeInput === item.key && active && (
				<FormDroppableFunctions
					item={item}
					setDroppedItems={setDroppedItems}
					allData={allItems}
					activeInput={activeInput}
				/>
			)}
		</div>
	);
}
