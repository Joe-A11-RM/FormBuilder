import { ColorPicker } from "antd";
import React from "react";

export default function FormOptionColors({
	title,
	id,
	dfcolor,
	updateActiveItem,
	attribute,
	activeItem,
	setCode,
	setStyleAttribute,
}) {
	const getStyleAttribute = (attr) => {
		switch (attr) {
			case "backgroundColor":
				return "background-color";
			default:
				return attr; // "color", etc.
		}
	};

	return (
		<div className="task-option-item">
			<label htmlFor={id} className="form-label">
				{title}
			</label>
			<ColorPicker
				value={activeItem ? activeItem : dfcolor}
				onChange={(e) => {
					const rgba = `rgba(${e?.metaColor?.r}, ${e?.metaColor?.g}, ${e?.metaColor?.b}, ${e?.metaColor?.a})`;
					const styleAttr = getStyleAttribute(attribute);

					updateActiveItem("css", (prev = {}) => ({
						...prev,
						[attribute]: rgba,
					}));

					if (setStyleAttribute) {
						setStyleAttribute(styleAttr);
					}

					if (setCode) {
						setCode((prev = "") => {
							const lines = prev
								.replace(/element\.style\s*{/, "")
								.replace(/}/, "")
								.trim()
								.split("\n")
								.filter(Boolean);

							const updatedLines = [
								...lines.filter((line) => !line.includes(styleAttr)),
								`  ${styleAttr}: ${rgba};`,
							];

							return `element.style {\n${updatedLines.join("\n")}\n}`;
						});
					}
				}}
			/>
		</div>
	);
}
