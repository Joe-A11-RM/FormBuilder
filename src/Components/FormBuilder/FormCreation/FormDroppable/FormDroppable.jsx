import React, { useMemo, useCallback, useState, Fragment } from "react";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import NormalInput from "../../../FormBuilderInputs/NormalInput";
import AntCalendar from "../../../FormBuilderInputs/Calendar";
import AntCheckBox from "../../../FormBuilderInputs/CheckBox";
import AntDatePicker from "../../../FormBuilderInputs/DatePicker";
import DropdownInput from "../../../FormBuilderInputs/DropdownInput";
import RadioGroup from "../../../FormBuilderInputs/RadioGroup";
import AntTextArea from "../../../FormBuilderInputs/TextArea";
import Toggle from "../../../FormBuilderInputs/Toggle";
import AntUpload from "../../../FormBuilderInputs/Upload";
import AntButton from "../../../FormBuilderInputs/Button";
import AntHeader from "../../../FormBuilderInputs/Header";
import Image from "../../../FormBuilderInputs/Image";
import Label from "../../../FormBuilderInputs/Label";
import Link from "../../../FormBuilderInputs/Link";
import ProgressCircle from "../../../FormBuilderInputs/ProgressCircle";
import ProgressLine from "../../../FormBuilderInputs/ProgressLine";
import Signature from "../../../FormBuilderInputs/Signature";
import SnippetCamera from "../../../FormBuilderInputs/Camera";
import Container from "../../../FormBuilderInputs/MultiInputs";

import FormDroppableItems from "./FormDroppableItems";

const overlayStyle = {
	width: "160px",
	height: "30px",
	background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
	color: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "6px",
	boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
	fontWeight: "600",
	fontSize: "13px",
	letterSpacing: "0.5px",
	textTransform: "capitalize",
	cursor: "grabbing",
	zIndex: 9999,
};

function FormDroppable({
	items,
	activeInput,
	setActiveInput,
	setDroppedItems,
	handleDragEnd,
	collapsed,
	active,
	setActive,
	dropIndicatorIndex,
	dragDirection,
	childLevel,
	topLevel,
}) {
	const { setNodeRef, isOver } = useDroppable({ id: "task-droppable" });
	// Avoid recreation on each render
	const getInputType = useCallback(
		(item) => {
			if (!item) return null;

			const props = { item, activeInput };

			switch (item.name) {
				case "Calendar":
					return <AntCalendar {...props} />;
				case "Checkbox":
					return <AntCheckBox {...props} />;
				case "DatePicker":
					return <AntDatePicker {...props} />;
				case "Dropdown":
					return <DropdownInput {...props} />;
				case "Input":
					return <NormalInput {...props} />;
				case "Container":
					return (
						<Container
							handleDragEnd={handleDragEnd}
							getInputType={getInputType}
							css={item.css}
							container={item.container}
							setActiveInput={setActiveInput}
							activeInput={activeInput}
							active={active}
							setActive={setActive}
							setDroppedItems={setDroppedItems}
							containerKey={item.key}
							dropIndicatorIndex={dropIndicatorIndex}
							dragDirection={dragDirection}
							childLevel={childLevel}
						/>
					);
				case "Radio group":
					return <RadioGroup {...props} />;
				case "Text area":
					return <AntTextArea {...props} />;
				case "Toggle":
					return <Toggle {...props} />;
				case "Uploader":
					return <AntUpload {...props} />;
				case "Button":
					return <AntButton {...props} />;
				case "Header":
					return <AntHeader {...props} />;
				case "Image":
					return <Image {...props} />;
				case "Label":
					return <Label {...props} />;
				case "Link":
					return <Link {...props} />;
				case "Progress circle":
					return <ProgressCircle item={item} />;
				case "Progress line":
					return <ProgressLine item={item} />;
				case "Signature":
					return <Signature item={item} setDroppedItems={setDroppedItems} />;
				case "Camera":
					return <SnippetCamera item={item} />;
				default:
					return item?.name || null;
			}
		},
		[activeInput, setDroppedItems, handleDragEnd, active, setActive]
	);

	// Memoize list of keys to avoid re-renders
	const itemKeys = useMemo(() => items.map((item) => item.key), [items]);

	const containerStyle = useMemo(() => {
		const baseStyle = {
			border: "1px dashed gray",
			backgroundColor: isOver ? "#0f69361f" : "#fafafa",
			padding: "20px",
			overflowY: "scroll",
			position: "relative",
		};

		if (collapsed.inputsCollapsed && collapsed.optionsCOllapsed) {
			return { ...baseStyle, width: "98%" };
		}
		if (collapsed.inputsCollapsed || collapsed.optionsCOllapsed) {
			return { ...baseStyle, width: "73%" };
		}
		return { ...baseStyle, width: "50%" };
	}, [collapsed.inputsCollapsed, collapsed.optionsCOllapsed, isOver]);

	return (
		<div ref={setNodeRef} style={containerStyle}>
			{items.length === 0 && (
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
			)}

			{items.map((item, index) => (
				<Fragment key={index}>
					{dropIndicatorIndex === index &&
						dragDirection === "up" &&
						topLevel && (
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
					<FormDroppableItems
						key={item.key}
						item={item}
						getInputType={getInputType}
						activeInput={activeInput}
						setActiveInput={setActiveInput}
						setDroppedItems={setDroppedItems}
						active={active}
						setActive={setActive}
						allItems={items}
					/>
					{dropIndicatorIndex === index &&
						dragDirection === "down" &&
						topLevel && (
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
				</Fragment>
			))}

			<DragOverlay>
				{activeInput && <div style={overlayStyle}>{activeInput}</div>}
			</DragOverlay>
		</div>
	);
}

export default React.memo(FormDroppable);
