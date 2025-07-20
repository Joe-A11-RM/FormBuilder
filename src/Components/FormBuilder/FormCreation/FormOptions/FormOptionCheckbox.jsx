import { Checkbox } from "antd";
import React from "react";

export default function FormOptionCheckbox({
	title,
	placeholder,
	value,
	id,
	disabled,
	min,
	max,
	onChange,
	defaultValue,
}) {
	return (
		<div className="task-option-item">
			<label htmlFor={id} className="form-label">
				{title}
			</label>
			<Checkbox key={id} checked={value} value={value} onChange={onChange} />
		</div>
	);
}
