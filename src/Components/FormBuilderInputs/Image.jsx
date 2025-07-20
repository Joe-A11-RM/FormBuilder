import React from "react";

export default function Image({ item, activeInput }) {
	return (
		<div style={item?.css}>
			<img
				src={item?.imgPath}
				alt="Form Input"
				key={activeInput}
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
				}}
			/>
		</div>
	);
}
