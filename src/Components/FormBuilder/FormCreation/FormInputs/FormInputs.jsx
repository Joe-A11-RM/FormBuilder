import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { Input } from "antd";

function DraggableItem({ id, name, disableDrop }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id,
			data: { name, id, source: "palette" },
		});
	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		zIndex: isDragging ? 9999 : "auto",
		position: isDragging ? "absolute" : "relative",
		cursor: disableDrop ? "not-allowed" : "grab",
		width: isDragging && "140px",
		height: isDragging && "30px",
		background:
			isDragging && "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
		color: isDragging && "#fff",
		display: isDragging && "flex",
		alignItems: isDragging && "center",
		justifyContent: isDragging && "center",
		borderRadius: isDragging && "6px",
		boxShadow: isDragging && "0 4px 8px rgba(0,0,0,0.2)",
		fontWeight: isDragging && "600",
		fontSize: isDragging && "14px",
		letterSpacing: isDragging && "0.5px",
		textTransform: "capitalize",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="task-input-drag"
			{...listeners}
			{...attributes}
		>
			{name}
		</div>
	);
}

export default function FormInputs({ collapsed, disableDrop }) {
	const [searchValue, setSearchValue] = useState();

	const Inputtypes = [
		{
			type: "Fields",
			data: [
				{ name: "Calendar" },
				{ name: "Checkbox" },
				{ name: "DatePicker" },
				{ name: "Dropdown" },
				{ name: "Input" },
				{ name: "Radio group" },
				{ name: "Text area" },
				{ name: "Toggle" },
				{ name: "Uploader" },
				{ name: "Button" },
				{ name: "Camera" },
			],
		},
		{
			type: "Static",
			data: [
				{ name: "Header" },
				{ name: "Image" },
				{ name: "Label" },
				{ name: "Link" },
				{ name: "Progress circle" },
				{ name: "Progress line" },
			],
		},
		{
			type: "Structure",
			data: [{ name: "Signature" }, { name: "Container" }],
		},
	];
	const filteredGroups = searchValue
		? Inputtypes.filter(
				(group) =>
					group.type.toLowerCase().includes(searchValue.toLowerCase()) ||
					group.data.some((item) =>
						item.name.toLowerCase().includes(searchValue.toLowerCase())
					)
		  )
		: Inputtypes;

	return (
		<div>
			<div>
				<Input
					placeholder="Search........"
					onChange={(e) => setSearchValue(e.target.value)}
					className="mb-2"
				/>
			</div>
			<div>
				{filteredGroups.map((group, groupIndex) => {
					const filteredData =
						searchValue &&
						group.type.toLowerCase().includes(searchValue.toLowerCase())
							? group.data
							: group.data.filter(
									(item) =>
										!searchValue ||
										item.name.toLowerCase().includes(searchValue.toLowerCase())
							  );
					if (filteredData.length === 0) return null;
					return (
						<div key={groupIndex} className="mb-2">
							<h5
								className="group-title"
								style={{ marginBottom: "1rem", textAlign: "start" }}
							>
								{group.type}
							</h5>
							<div className="row">
								{filteredData.map((item, itemIndex) => (
									<div className="col-lg-6" key={itemIndex}>
										<DraggableItem
											id={`${item.name
												.toLowerCase()
												.replace(/\s+/g, "-")}-${uuidv4().slice(0, 8)}`}
											name={item.name}
											disableDrop={disableDrop}
										/>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
