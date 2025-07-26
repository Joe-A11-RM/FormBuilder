import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import FormBuilderHeader from "./FormBuilderHeader";
import FormDroppable from "./FormCreation/FormDroppable/FormDroppable";
import FormSections from "./FormCreation/FormSections/FormSections";
import FormOptions from "./FormCreation/FormOptions/FormOptions";
import { arrayMove } from "@dnd-kit/sortable";
import { useRef } from "react";

export default function FormBuilder() {
	const [formInf, setFormInf] = useState({ name: null, description: null });
	const [droppedItems, setDroppedItems] = useState([]);
	const [others, setOthers] = useState("static");
	const [activeInput, setActiveInput] = useState("");
	const [active, setActive] = useState(false);
	const [collapsed, setCollapsed] = useState({
		inputsCollapsed: false,
		optionsCOllapsed: false,
	});
	const [dropIndicatorIndex, setDropIndicatorIndex] = useState(null);
	const [dragDirection, setDragDirection] = useState(null);
	const [topLevel, setTopLevel] = useState(false);
	const [childLevel, setChildLevel] = useState(false);

	const dragDataRef = useRef(null);
	let FormData = { ...formInf, data: droppedItems };
	const buildItemFromDragData = (id, dragData) => ({
		key: id,
		name: dragData.name,
		title: dragData.name,
		placeholder: null,
		css: {},
		required: { value: false, validationMessage: "" },
		radioOptions:
			dragData.name === "Radio group"
				? [
						{ value: "Option A", label: "Option A" },
						{ value: "Option B", label: "Option B" },
						{ value: "Option C", label: "Option C" },
				  ]
				: null,
		dropdownOptions:
			dragData.name === "Dropdown"
				? {
						queryKey: "static",
						data: [
							{ value: "Option A", label: "Option A" },
							{ value: "Option B", label: "Option B" },
							{ value: "Option C", label: "Option C" },
						],
				  }
				: null,
		inputType: dragData.name === "Input" ? "text" : null,
		btnType: dragData.name === "Button" ? "button" : null,
		hyperLink: null,
		imgPath: null,
		container: [],
	});

	const handleDragEnd = async (event) => {
		const { active, over } = event;

		try {
			if (!over) return;

			const dragData = dragDataRef.current;
			if (!dragData) {
				console.warn("Missing drag data");
				return;
			}

			const isActiveTop = droppedItems.some((item) => item.key === active.id);
			const isOverTop = droppedItems.some((item) => item.key === over.id);

			// ✅ Reorder on top level
			if (isActiveTop && isOverTop && active.id !== over.id) {
				const oldIndex = droppedItems.findIndex(
					(item) => item.key === active.id
				);
				const newIndex = droppedItems.findIndex((item) => item.key === over.id);
				if (oldIndex !== -1 && newIndex !== -1) {
					setDroppedItems((items) => arrayMove(items, oldIndex, newIndex));
				}
				return;
			}

			// ✅ Reorder inside containers
			// === CASE 2: Reorder items inside the same container ===
			const activeMatch = active.id.match(/^task-item-(container-.*?)-(.*)$/);
			const overMatch = over.id?.match(/^task-item-(container-.*?)-(.*)$/);

			if (activeMatch && overMatch) {
				const [, activeContainerKey, activeItemKey] = activeMatch;
				const [, overContainerKey, overItemKey] = overMatch;

				if (
					activeContainerKey === overContainerKey &&
					activeItemKey !== overItemKey
				) {
					setDroppedItems((prev) =>
						prev.map((parent) => {
							if (parent.key === activeContainerKey) {
								const list = parent.container || [];
								const oldIndex = list.findIndex((i) => i.key === activeItemKey);
								const newIndex = list.findIndex((i) => i.key === overItemKey);
								if (oldIndex !== -1 && newIndex !== -1) {
									return {
										...parent,
										container: arrayMove(list, oldIndex, newIndex),
									};
								}
							}
							return parent;
						})
					);
					return;
				}
			}
			// ✅ Prevent dropping a container into another container
			const match = over.id.match(/^task-droppable-(container-.*)$/);
			if (match && dragData.name === "Container") {
				alert("You can't drop a container into a container");
				return;
			}

			const combinedItem = buildItemFromDragData(active.id, dragData);
			const { container, ...cleanedCombinedItem } = combinedItem;

			// ✅ Dropping inside a container
			if (match) {
				const matchedKey = match[1];
				setActiveInput(active.id);

				setDroppedItems((prev) => {
					const movedItemIndex = prev.findIndex((i) => i.key === active.id);
					const movedItem =
						movedItemIndex !== -1 ? prev[movedItemIndex] : cleanedCombinedItem;

					// ❌ Skip if item is invalid
					if (!movedItem.name) return prev;

					// ❌ Prevent dropping into container if already inside
					return (
						prev
							.map((item) => {
								if (item.key === matchedKey) {
									const alreadyInContainer = item.container?.some(
										(i) => i.key === movedItem.key
									);
									if (alreadyInContainer) return item;

									return {
										...item,
										container: [...item.container, movedItem],
									};
								}
								return item;
							})
							// ✅ Remove item from top-level if it was dragged from there
							.filter((item) => item.key !== active.id)
					);
				});
				return;
			}

			// ✅ Dropping into top-level (non-container area)
			if (over.id === "task-droppable") {
				setActiveInput(active.id);

				const fromContainerMatch = active.id.match(
					/^task-item-(container-.*?)-(.*)$/
				);

				if (fromContainerMatch) {
					const [, parentKey, childKey] = fromContainerMatch;
					setDroppedItems((prev) => {
						let extractedItem = null;
						const updated = prev.map((item) => {
							if (item.key === parentKey) {
								const container = item.container || [];
								const filtered = container.filter((child) => {
									if (child.key === childKey) {
										extractedItem = child;
										return false;
									}
									return true;
								});
								return {
									...item,
									container: filtered,
								};
							}
							return item;
						});
						return extractedItem ? [...updated, extractedItem] : prev;
					});
					return;
				}

				if (combinedItem.name !== undefined) {
					setDroppedItems((prev) => [...prev, combinedItem]);
				}
			}
		} finally {
			setDropIndicatorIndex(null);
			setDragDirection(null);
			setTopLevel(false);
			setChildLevel(false);
		}
	};

	return (
		<div>
			{/**<FormBuilderHeader />*/}
			<DndContext
				onDragStart={(event) => {
					const dragged = event.active?.data?.current;
					if (dragged) {
						dragDataRef.current = dragged; // Store it manually
						setActiveInput(dragged.id);
						setActive(true);
					}
				}}
				onDragOver={({ active, over }) => {
					if (!over?.id || !active?.id || active.id === over.id) return;

					// Top-level check
					const overIndex = droppedItems.findIndex(
						(item) => item.key === over.id
					);
					const activeIndex = droppedItems.findIndex(
						(item) => item.key === active.id
					);

					if (overIndex !== -1 && activeIndex !== -1) {
						setDropIndicatorIndex(overIndex);
						setDragDirection(activeIndex < overIndex ? "down" : "up");
						setTopLevel(true);
						setChildLevel(false);
						return;
					}

					// Container item check
					const activeMatch = active.id.match(
						/^task-item-(container-.*?)-(.*)$/
					);
					const overMatch = over.id.match(/^task-item-(container-.*?)-(.*)$/);

					if (activeMatch && overMatch) {
						const [, activeContainerKey, activeItemKey] = activeMatch;
						const [, overContainerKey, overItemKey] = overMatch;

						if (activeContainerKey === overContainerKey) {
							const containerItem = droppedItems.find(
								(item) => item.key === overContainerKey
							);
							if (!containerItem?.container) return;

							const containerItems = containerItem.container;
							const activeIndex = containerItems.findIndex(
								(item) => item.key === activeItemKey
							);
							const overIndex = containerItems.findIndex(
								(item) => item.key === overItemKey
							);

							if (activeIndex !== -1 && overIndex !== -1) {
								setDropIndicatorIndex(overIndex);
								setDragDirection(activeIndex < overIndex ? "down" : "up");
								setTopLevel(false);
								setChildLevel(true);
							}
						}
					}
				}}
				onDragEnd={handleDragEnd}
			>
				<div className="taskbuilder-layout">
					<FormSections
						collapsed={collapsed}
						formInf={formInf}
						setFormInf={setFormInf}
						items={droppedItems}
						setActiveInput={setActiveInput}
						activeInput={activeInput}
						setActive={setActive}
					/>
					<div className="task-resizing-arrows">
						<SlArrowLeft
							style={{
								width: "24px",
								height: "24px",
								cursor: "pointer",
								transform: collapsed.inputsCollapsed && "rotateY(180deg)",
							}}
							onClick={() =>
								setCollapsed({
									inputsCollapsed: !collapsed.inputsCollapsed,
									optionsCOllapsed: collapsed.optionsCOllapsed,
								})
							}
						/>
					</div>
					<FormDroppable
						FormData={FormData}
						items={droppedItems}
						setActiveInput={setActiveInput}
						activeInput={activeInput}
						setDroppedItems={setDroppedItems}
						handleDragEnd={handleDragEnd}
						collapsed={collapsed}
						active={active}
						setActive={setActive}
						dragDirection={dragDirection}
						dropIndicatorIndex={dropIndicatorIndex}
						topLevel={topLevel}
						childLevel={childLevel}
					/>
					<div className="task-resizing-arrows">
						<SlArrowRight
							style={{
								width: "24px",
								height: "24px",
								cursor: "pointer",
								transform: collapsed.optionsCOllapsed && "rotateY(-180deg)",
							}}
							onClick={() =>
								setCollapsed({
									inputsCollapsed: collapsed.inputsCollapsed,
									optionsCOllapsed: !collapsed.optionsCOllapsed,
								})
							}
						/>
					</div>
					<FormOptions
						setDroppedItems={setDroppedItems}
						activeInput={activeInput}
						items={droppedItems}
						setOthers={setOthers}
						others={others}
						collapsed={collapsed}
					/>
				</div>
			</DndContext>
		</div>
	);
}
