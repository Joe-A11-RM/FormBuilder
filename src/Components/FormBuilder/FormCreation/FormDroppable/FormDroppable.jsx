import React, {
	useMemo,
	useCallback,
	useState,
	Fragment,
	useRef,
	useEffect,
} from "react";
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
import FormDroppableHeader from "./FormDroppableHeader";

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
	FormData,
}) {
	const containerRef = useRef(null);
	const [width, setWidth] = useState("100%");
	const [height, setHeight] = useState("calc(100vh - 50px)");
	const [preview, setPreview] = useState(false);
	const isDragging = !!active;
	useEffect(() => {
		if (!isDragging) return;
		const container = containerRef.current;
		if (!container) return;

		const scrollSpeed = 10;
		const edgeOffset = 100;

		const handleDragScroll = (e) => {
			const { top, bottom } = container.getBoundingClientRect();
			const mouseY = e.clientY;

			if (mouseY < top + edgeOffset) {
				container.scrollTop -= scrollSpeed;
			} else if (mouseY > bottom - edgeOffset) {
				container.scrollTop += scrollSpeed;
			}
		};

		window.addEventListener("dragover", handleDragScroll);
		return () => {
			window.removeEventListener("dragover", handleDragScroll);
		};
	}, [isDragging]);

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
			overflowY: "scroll",
			position: "relative",
			padding: "20px",
		};

		return baseStyle;
	}, [collapsed.inputsCollapsed, collapsed.optionsCOllapsed, isOver]);
	const checkWidth = () => {
		if (collapsed.inputsCollapsed && collapsed.optionsCOllapsed) {
			return "98%";
		} else if (collapsed.inputsCollapsed || collapsed.optionsCOllapsed) {
			return "74%";
		} else {
			return "50%";
		}
	};
	return (
		<div style={{ width: checkWidth() }}>
			{items?.length > 0 && (
				<FormDroppableHeader
					setHeight={setHeight}
					setWidth={setWidth}
					setPreview={setPreview}
					preview={preview}
					data={items}
					FormData={FormData}
				/>
			)}
			<div
				ref={setNodeRef}
				style={{
					...containerStyle,
					width: width,
					height: items?.length > 0 && height,
					margin: "auto",
					transition: "width 0.3s, height 0.3s",
				}}
			>
				<div ref={containerRef}>
					{items.length === 0 && (
						<h4
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: "100vh",
							}}
						>
							Drop Area
						</h4>
					)}

					{items.map((item, index) => (
						<div
							key={index}
							style={{
								marginBottom:
									index === items.length - 1 && isDragging ? "120px" : "0px",
								transition: "margin 0.2s",
							}}
						>
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
						</div>
					))}
				</div>

				<DragOverlay>
					{activeInput && <div style={overlayStyle}>{activeInput}</div>}
				</DragOverlay>
			</div>
		</div>
	);
}

export default React.memo(FormDroppable);
