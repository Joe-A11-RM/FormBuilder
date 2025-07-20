import React, { useEffect, useState } from "react";
import { Radio } from "antd";

export default function FormOptionBtn({ id, onChange, value }) {
	const [type, setType] = useState("button");
	useEffect(() => {
		if (onChange) onChange({ target: { value: type } });
	}, [type]);
	const handleChange = (e) => {
		setType(e.target.value);
	};
	return (
		<>
			<div className="task-btn-layout" key={id}>
				<label htmlFor={id} className="form-label">
					Button Type
				</label>
				<Radio.Group
					style={{ display: "flex", flexDirection: "column", gap: 8 }}
					onChange={handleChange}
					value={value ? value : type}
					options={[
						{ value: "button", label: "Button" },
						{ value: "submit", label: "Submit" },
					]}
				/>
			</div>
		</>
	);
}
