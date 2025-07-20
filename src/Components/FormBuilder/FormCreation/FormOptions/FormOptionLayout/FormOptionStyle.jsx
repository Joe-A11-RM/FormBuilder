import React, { useState } from "react";
import CodeBlock from "../../../../FormBuilderInputs/CodeBlock";
import { Radio } from "antd";
import FormOptionBasicStyle from "./FormStyle/FormOptionBasicStyle";

export default function FormOptionStyle({
	activeItem,
	code,
	setCode,
	updateActiveItem,
	parseInlineStyle,
}) {
	const [styleType, setstyleType] = useState("basic");
	const [basicCode, setBasicCode] = useState();
	return (
		<>
			<h3>Style</h3>
			<Radio.Group
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 8,
					marginBottom: "16px",
				}}
				onChange={(e) => setstyleType(e.target.value)}
				value={styleType}
				options={[
					{ value: "basic", label: "Basic" },
					{ value: "advanced", label: "Advanced" },
				]}
			/>
			{styleType === "advanced" && (
				<CodeBlock
					id={activeItem?.key}
					css={code}
					onChange={(updatedCode) => {
						setCode(updatedCode);
						updateActiveItem("css", parseInlineStyle(updatedCode));
					}}
				/>
			)}
			{styleType === "basic" && (
				<FormOptionBasicStyle
					id={activeItem?.key}
					basicCode={basicCode}
					setBasicCode={setBasicCode}
					setCode={setCode}
					updateActiveItem={updateActiveItem}
					activeItem={activeItem}
				/>
			)}
		</>
	);
}
