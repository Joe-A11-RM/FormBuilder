import { Input } from "antd";
import React from "react";

export default function FormOptionInput({
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
			<Input
				type="text"
				placeholder={placeholder}
				value={value}
				id={title}
				onChange={onChange}
			/>
		</div>
	);
}
