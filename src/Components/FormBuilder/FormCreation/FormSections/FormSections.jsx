import React, { useState } from "react";
import FormInf from "../FormInf/FormInf";
import { Segmented } from "antd";
import FormTree from "../FormTree/FormTree";
import FormInputs from "../FormInputs/FormInputs";

export default function FormSections({
	collapsed,
	items,
	setActiveInput,
	setActive,
	disableDrop,
	formInf,
	setFormInf,
	containerKey,
}) {
	const [activeOption, setActiveOption] = useState("Main");
	return (
		<div
			className="task-inputs-layout"
			style={{
				width: !collapsed.inputsCollapsed ? "24%" : "0%",
				padding: !collapsed.inputsCollapsed ? "16px" : "0%",
			}}
		>
			<Segmented
				options={["Main", "Fields", "Form Tree"]}
				onChange={(value) => {
					setActiveOption(value);
				}}
				className="mb-3 w-100 segmented-full"
			/>

			{activeOption === "Fields" && (
				<FormInputs disableDrop={disableDrop} collapsed={collapsed} />
			)}
			{activeOption === "Main" && (
				<FormInf collapsed={collapsed} setFormInf={setFormInf} />
			)}
			{activeOption === "Form Tree" && (
				<FormTree
					collapsed={collapsed}
					items={items}
					setActiveInput={setActiveInput}
					setActive={setActive}
				/>
			)}
		</div>
	);
}
