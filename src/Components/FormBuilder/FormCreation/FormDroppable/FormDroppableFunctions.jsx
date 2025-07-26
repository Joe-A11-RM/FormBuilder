import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaRegClone, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

export default function FormDroppableFunctions({
	item,
	allData,
	setDroppedItems,
	container,
	containerKey,
}) {
	const [child, setChild] = useState(false);

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
				: null,
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
		container: null,
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

		if (item.name === "Container") {
			// 🔁 Clone full container (with all children)
			setDroppedItems((prev) => {
				const updated = [...prev];
				const original = updated[index];

				// Clone all children
				const clonedChildren = original.container.map((child) => ({
					...child,
					key: `${child.name
						?.toLowerCase()
						.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`,
				}));

				const clonedContainer = {
					...original,
					key: `${original.name
						?.toLowerCase()
						.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`,
					container: clonedChildren,
				};
				updated.splice(index + 1, 0, clonedContainer);
				return updated;
			});
		} else if (container) {
			// 🧩 Clone item inside its container
			setDroppedItems((prev) => {
				return prev.map((containerItem) => {
					if (
						containerItem.key === containerKey &&
						Array.isArray(containerItem.container)
					) {
						const itemIndex = containerItem.container.findIndex(
							(i) => i.key === item.key
						);
						if (itemIndex !== -1) {
							const cloned = {
								...containerItem.container[itemIndex],
								key: `${item.name
									?.toLowerCase()
									.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`,
							};
							const newContainer = [
								...containerItem.container.slice(0, itemIndex + 1),
								cloned,
								...containerItem.container.slice(itemIndex + 1),
							];
							return { ...containerItem, container: newContainer };
						}
					}
					return containerItem;
				});
			});
		} else {
			// 📦 Clone top-level item
			setDroppedItems((prev) => {
				const updated = [...prev];
				const original = updated[index];

				const cloned = {
					...original,
					key: `${original.name
						?.toLowerCase()
						.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`,
				};

				updated.splice(index + 1, 0, cloned);
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
