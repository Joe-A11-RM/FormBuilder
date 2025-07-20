import { Select } from "antd";
import { useEffect, useState } from "react";

export default function FormOptionAlignment({
	title,
	id,
	updateActiveItem,
	attribute,
	activeItem,
	setCode,
	setStyleAttribute,
	options,
	placeholder,
}) {
	const [value, setValue] = useState("");

	// Reset on id change
	useEffect(() => {
		setValue("");
	}, [id]);

	// Sync from activeItem
	useEffect(() => {
		if (typeof activeItem === "string") {
			setValue(activeItem);
		}
	}, [activeItem]);

	// Update CSS and code block when value changes
	useEffect(() => {
		if (value !== "") {
			updateActiveItem("css", (prev = {}) => ({
				...prev,
				[attribute]: value,
			}));

			let styleAttr = "";

			switch (attribute) {
				case "flexDirection":
					styleAttr = "flex-direction";
					break;
				case "flexWrap":
					styleAttr = "flex-wrap";
					break;
				case "alignItems":
					styleAttr = "align-items";
					break;
				case "justifyContent":
					styleAttr = "justify-content";
					break;
				default:
					styleAttr = attribute; // fallback
			}

			if (setStyleAttribute) {
				setStyleAttribute(styleAttr);
			}

			setCode((prev) => {
				const safePrev = prev || ""; // fallback in case prev is undefined
				const lines = safePrev
					.replace(/element\.style\s*{/, "")
					.replace(/}/, "")
					.trim()
					.split("\n")
					.filter(Boolean);

				const updatedLines = [
					...lines.filter((line) => !line.includes(styleAttr)),
					`  ${styleAttr}: ${value};`,
				];

				return `element.style {\n${updatedLines.join("\n")}\n}`;
			});
		}
	}, [value, attribute]);

	return (
		<div className="task-option-item">
			<label htmlFor={id} className="form-label">
				{title}
			</label>
			<div className="task-basic-style-options" style={{ display: "flex" }}>
				<Select
					style={{ width: "100%" }}
					options={options}
					value={value === "" ? null : value}
					onChange={(val) => setValue(val)}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
