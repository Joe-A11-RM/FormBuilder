import { Button } from "antd";
import React from "react";

export default function FormBuilderHeader() {
	return (
		<div className="form-builder-header">
			<div>
				<div className="form-builder-header-title">create form template</div>
				<div className="form-builder-header-subtitle">
					Design custom forms for your workforce tasks
				</div>
			</div>
			<div className="form-preview-btn">
				<Button
					img="/New/Randoms/eye.svg"
					imgspacing={false}
					text="Preview"
					type="default"
				/>
			</div>
			<div className="d-flex align-items-center">
				<Button text="Cancel" type="default" className="me-2" />
				<Button text="Save" type="primary" />
			</div>
		</div>
	);
}
