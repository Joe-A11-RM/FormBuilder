import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export default function FormInf({ collapsed, setFormInf }) {
	return (
		<div>
			<p style={{ fontSize: 16, fontWeight: 600, textTransform: "capitalize" }}>
				form settings
			</p>
			<div className="w-100 mb-3">
				<label className="form-label text-capitalize">form name</label>
				<Input
					placeholder="Enter Form Name."
					onChange={(e) =>
						setFormInf((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
			</div>
			<div className="w-100">
				<label className="form-label text-capitalize">form description</label>
				<TextArea
					placeholder="Enter Form Description."
					onChange={(e) =>
						setFormInf((prev) => ({ ...prev, description: e.target.value }))
					}
				/>
			</div>
		</div>
	);
}
