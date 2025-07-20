import React from "react";
import FormOptionInput from "../FormOptionInput";
import FormOptionRadio from "../FormOptionRadio";
import FormOptionBtn from "../FormOptionsBtn";
import FormOptionDropdown from "../FormOptionDropdown";
import FormOptionCheckbox from "../FormOptionCheckbox";
import { Radio } from "antd";

export default function FormOptionMain({
	activeInput,
	activeItem,
	updateActiveItem,
	setOthers,
	others,
}) {
	return (
		<>
			<h3>Main</h3>
			<div className="task-option-item">
				<label htmlFor="key" className="form-label">
					Key
				</label>
				<div>{activeInput || "No input selected"}</div>
			</div>
			<FormOptionInput
				title="Title"
				placeholder="Enter input title"
				value={activeItem.title === null ? activeItem.name : activeItem.title}
				onChange={(e) => updateActiveItem("title", e.target.value)}
			/>

			{(activeItem.name === "Input" ||
				activeItem.name === "Text area" ||
				activeItem.name === "Dropdown") && (
				<FormOptionInput
					title="Placeholder"
					placeholder="Enter input placeholder"
					value={activeItem.placeholder}
					onChange={(e) => updateActiveItem("placeholder", e.target.value)}
				/>
			)}
			{activeItem.name === "Input" && (
				<>
					<div className="task-option-item">
						<label htmlFor={activeItem.name} className="form-label">
							input type
						</label>
						<Radio.Group
							style={{ display: "flex", flexDirection: "row", gap: 24 }}
							value={activeItem.inputType}
							onChange={(e) => updateActiveItem("inputType", e.target.value)}
							options={[
								{ label: "Text", value: "text" },
								{ label: "Number", value: "number" },
							]}
						/>
					</div>
				</>
			)}
			{activeItem.name === "Link" && (
				<FormOptionInput
					title="Link"
					placeholder="Enter hyperLink"
					value={
						activeItem.hyperLink === null
							? activeItem.name
							: activeItem.hyperLink
					}
					onChange={(e) => updateActiveItem("hyperLink", e.target.value)}
				/>
			)}
			{activeItem.name === "Image" && (
				<FormOptionInput
					title="Image Link"
					placeholder="Enter Image Link"
					onChange={(e) => updateActiveItem("imgPath", e.target.value)}
				/>
			)}
			{activeItem.name !== "Radio group" &&
				activeItem.name !== "Toggle" &&
				activeItem.name !== "Uploader" &&
				activeItem.name !== "Button" &&
				activeItem.name !== "Checkbox" &&
				activeItem.name !== "Container" &&
				activeItem.name !== "Image" &&
				activeItem.name !== "Header" &&
				activeItem.name !== "Label" &&
				activeItem.name !== "Link" &&
				activeItem.name !== "Progress line" &&
				activeItem.name !== "Progress circle" &&
				activeItem.name !== "Signature" && (
					<>
						<FormOptionCheckbox
							title="Required"
							id={activeItem?.key}
							value={activeItem?.required?.value}
							onChange={(e) =>
								updateActiveItem("required.value", e.target.checked)
							}
						/>

						{activeItem.required?.value && (
							<FormOptionInput
								title="Validation Message"
								placeholder="Enter validation message"
								value={activeItem.required.validationMessage || ""}
								onChange={(e) =>
									updateActiveItem("required.validationMessage", e.target.value)
								}
							/>
						)}
					</>
				)}
			{activeItem.name === "Radio group" && (
				<FormOptionRadio
					id={activeItem?.key}
					radioOptions={activeItem?.radioOptions}
					onChange={(e) => updateActiveItem("radioOptions", e.target.value)}
				/>
			)}
			{activeItem.name === "Button" && (
				<FormOptionBtn
					id={activeItem?.key}
					onChange={(e) => updateActiveItem("btnType", e.target.value)}
				/>
			)}
			{activeItem.name === "Dropdown" && (
				<FormOptionDropdown
					id={activeItem?.key}
					dropdownOptions={activeItem?.dropdownOptions.data}
					setOthers={setOthers}
					others={others}
					onChange={(e) => updateActiveItem("dropdownOptions", e.target.value)}
				/>
			)}
		</>
	);
}
