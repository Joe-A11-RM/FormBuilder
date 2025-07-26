import { Select, Input as AntdInput } from "antd";
import { useEffect, useState } from "react";

export default function FormStyleUnits({
	title,
	id,
	updateActiveItem,
	attribute,
	activeItem,
	setCode,
	placeholder,
}) {
	const [unit, setUnit] = useState("%");
	const [basicCode, setBasicCode] = useState("");
	const [styleAttribute, setStyleAttribute] = useState();
	useEffect(() => {
		setBasicCode("");
		setUnit("%");
	}, [id]);
	// Sync from activeItem on first mount or when it changes
	useEffect(() => {
		if (activeItem && typeof activeItem === "string") {
			const match = activeItem.match(/^(\d+)(\D+)$/); // splits "100px" => ["100px", "100", "px"]
			if (match) {
				setBasicCode(match[1]); // "100"
				setUnit(match[2]); // "px"
			}
		}
	}, [activeItem]);

	// Update style when code or unit changes
	useEffect(() => {
		if (basicCode !== "") {
			updateActiveItem("css", (prev = {}) => ({
				...prev,
				[attribute]: `${basicCode}${unit}`,
			}));

			let styleAttr = "";

			switch (attribute) {
				case "width":
				case "height":
				case "color":
				case "gap":
					styleAttr = attribute;
					break;
				case "marginTop":
					styleAttr = "margin-top";
					break;
				case "marginBottom":
					styleAttr = "margin-bottom";
					break;
				case "marginLeft":
					styleAttr = "margin-left";
					break;
				case "marginRight":
					styleAttr = "margin-right";
					break;
				case "backgroundColor":
					styleAttr = "background-color";
					break;
				default:
					return;
			}

			setStyleAttribute(styleAttr);

			// Append or update previous style block
			setCode((prev = "") => {
				const lines = prev
					.replace(/element\.style\s*{/, "")
					.replace(/}/, "")
					.trim()
					.split("\n")
					.filter(Boolean);

				const updatedLines = [
					...lines.filter((line) => !line.includes(styleAttr)),
					`  ${styleAttr}: ${basicCode}${unit};`,
				];

				return `element.style {\n${updatedLines.join("\n")}\n}`;
			});
		}
	}, [unit, basicCode, attribute]);
	return (
		<div className="task-option-item">
			<label htmlFor={id} className="form-label">
				{title}
			</label>
			<div className="task-basic-style-options" style={{ display: "flex" }}>
				<AntdInput
					type="number"
					value={basicCode}
					onChange={(e) => {
						if (styleAttribute === "width") {
							setBasicCode(e.target.value ? e.target.value : "100");
						} else {
							setBasicCode(e.target.value ? e.target.value : "0");
						}
					}}
					min={0}
					placeholder={placeholder}
				/>
				<Select
					style={{ width: "100%", marginLeft: "8px" }}
					options={[
						{ label: "%", value: "%" },
						{ label: "px", value: "px" },
						{ label: "em", value: "em" },
						{ label: "vw", value: "vw" },
						{ label: "vh", value: "vh" },
						{ label: "max-content", value: "max-content" },
						{ label: "min-content", value: "min-content" },
						{ label: "fit-content", value: "fit-content" },
					]}
					value={unit}
					onChange={(value) => setUnit(value)}
				/>
			</div>
		</div>
	);
}
