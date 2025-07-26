import { message, Tabs } from "antd";
import React, { useState } from "react";
import { AiOutlineDesktop, AiOutlineTablet } from "react-icons/ai";
import { IoPhonePortraitOutline, IoSaveOutline } from "react-icons/io5";
import { PiDeviceRotateLight } from "react-icons/pi";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Tooltip } from "antd";
import { FaRegSave } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
export default function FormDroppableHeader({
	setWidth,
	setHeight,
	setPreview,
	FormData,
	preview,
}) {
	const [value, setValue] = useState("desktop");
	const [rotate, setRotate] = useState(false);

	const updateDimensions = (device, rotateMode) => {
		setPreview(true);

		if (rotateMode) {
			// Landscape orientation (fixed width)
			setWidth("100%");
			if (device === "phone") {
				setHeight("25%");
			} else if (device === "tablet") {
				setHeight("40%");
			} else {
				setHeight("calc(100vh - 50px)");
			}
		} else {
			// Portrait orientation
			if (device === "phone") {
				setWidth("375px"); // fixed width for phone preview
				setHeight("calc(100vh - 50px)");
			} else if (device === "tablet") {
				setWidth("768px"); // fixed width for tablet preview
				setHeight("calc(100vh - 50px)");
			} else {
				setWidth("100%"); // desktop
				setHeight("calc(100vh - 50px)");
			}
		}
	};

	const onChange = (key) => {
		setValue(key);
		updateDimensions(key, rotate);
	};

	const handleRotate = () => {
		const newRotate = !rotate;
		setRotate(newRotate);
		updateDimensions(value, newRotate);
	};

	const handleButtonClick = (e) => {
		message.info("Click on left button.");
	};

	const items = [
		{
			label: "Save",
			key: "save",
			icon: <IoSaveOutline size={18} />,
		},
		{
			label: "Download",
			key: "download",
			icon: <CiSaveDown2 size={18} />,
		},
	];
	const handleMenuClick = ({ key }) => {
		if (!FormData) {
			message.error("No data to export");
			return;
		}

		const json = JSON.stringify(FormData, null, 2); // formatted JSON
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		if (key === "save" || key === "download") {
			link.href = url;
			link.download = FormData.name
				? `${FormData?.name}-form.json`
				: "form.json"; // filename
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
			message.success("JSON file exported");
		}
	};
	const menuProps = {
		items,
		onClick: handleMenuClick,
	};
	return (
		<div
			className="d-flex justify-content-between align-items-center w-100 p-4"
			style={{ height: "50px" }}
		>
			<Dropdown menu={menuProps}>
				<Button>
					<Space>
						Options
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<div className="d-flex align-items-center">
				{value !== "desktop" && (
					<PiDeviceRotateLight
						size={16}
						className="me-2"
						cursor="pointer"
						onClick={handleRotate}
						title="Rotate"
					/>
				)}
				<Tabs
					defaultActiveKey="desktop"
					items={[
						{ key: "phone", label: <IoPhonePortraitOutline size={20} /> },
						{ key: "tablet", label: <AiOutlineTablet size={20} /> },
						{ key: "desktop", label: <AiOutlineDesktop size={20} /> },
					]}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}
