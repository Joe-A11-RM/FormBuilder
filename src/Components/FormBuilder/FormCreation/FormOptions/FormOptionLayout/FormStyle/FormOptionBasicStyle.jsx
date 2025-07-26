import FormOptionAlignment from "./FormOptionAlignment";
import FormOptionColors from "./FormOptionColors";
import FormStyleUnits from "./FormStyleUnits";

export default function FormOptionBasicStyle({
	id,
	setBasicCode,
	basicCode,
	updateActiveItem,
	activeItem,
	setCode,
}) {
	return (
		<>
			{activeItem.name === "Container" && (
				<>
					<FormOptionAlignment
						title="direction"
						options={[
							{ label: "Column", value: "column" },
							{ label: "Row", value: "row" },
							{ label: "Column Reverse", value: "column-reverse" },
							{ label: "Row Reverse", value: "row-reverse" },
						]}
						activeItem={activeItem.css.flexDirection}
						updateActiveItem={updateActiveItem}
						setCode={setCode}
						attribute="flexDirection"
						placeholder="Choose direction"
					/>
					<FormOptionAlignment
						title="flex wrap"
						options={[
							{ label: "Wrap", value: "wrap" },
							{ label: "NoWrap", value: "nowrap" },
							{ label: "Wrap Reverse", value: "wrap-reverse" },
						]}
						activeItem={activeItem.css.flexWrap}
						updateActiveItem={updateActiveItem}
						setCode={setCode}
						attribute="flexWrap"
						placeholder="Choose wrap"
					/>
					<FormOptionAlignment
						title="align items"
						options={[
							{ label: "Start", value: "start" },
							{ label: "Center", value: "center" },
							{ label: "End", value: "end" },
							{ label: "Baseline", value: "baseline" },
							{ label: "Stretch", value: "stretch" },
						]}
						activeItem={activeItem.css.alignItems}
						updateActiveItem={updateActiveItem}
						setCode={setCode}
						attribute="alignItems"
						placeholder="Choose align type"
					/>
					<FormOptionAlignment
						title="justify"
						options={[
							{ label: "Flex Start", value: "flex-start" },
							{ label: "Flex End", value: "flex-end" },
							{ label: "Center", value: "center" },
							{ label: "Space Between", value: "space-between" },
							{ label: "Space Around", value: "space-around" },
							{ label: "Space Evenly", value: "space-evenly" },
							{ label: "Start", value: "start" },
							{ label: "End", value: "end" },
							{ label: "Left", value: "left" },
							{ label: "Right", value: "right" },
						]}
						activeItem={activeItem.css.justifyContent}
						updateActiveItem={updateActiveItem}
						setCode={setCode}
						attribute="justifyContent"
						placeholder="Choose justify type"
					/>
					<FormStyleUnits
						title="gap"
						id={id}
						basicCode={basicCode}
						setBasicCode={setBasicCode}
						updateActiveItem={updateActiveItem}
						attribute="gap"
						activeItem={activeItem.css.gap}
						setCode={setCode}
						placeholder="Enter gap"
					/>
				</>
			)}
			<FormStyleUnits
				title="width"
				id={id}
				basicCode={basicCode}
				setBasicCode={setBasicCode}
				updateActiveItem={updateActiveItem}
				attribute="width"
				activeItem={activeItem.css.width}
				setCode={setCode}
				placeholder="Enter width"
			/>
			{(activeItem.name === "Header" ||
				activeItem.name === "Button" ||
				activeItem.name === "Label" ||
				activeItem.name === "Link" ||
				activeItem.name === "Progress_Circle" ||
				activeItem.name === "Progress_Line" ||
				activeItem.name === "Image") && (
				<>
					<FormOptionAlignment
						title="text align"
						options={[
							{ label: "Left", value: "left" },
							{ label: "Center", value: "center" },
							{ label: "Right", value: "right" },
						]}
						activeItem={activeItem.css.alignItems}
						updateActiveItem={updateActiveItem}
						setCode={setCode}
						attribute="textAlign"
						placeholder="Choose alignment"
					/>
				</>
			)}
			{(activeItem.name === "Container" ||
				activeItem.name === "Button" ||
				activeItem.name === "Image") && (
				<FormStyleUnits
					title="height"
					id={id}
					basicCode={basicCode}
					setBasicCode={setBasicCode}
					updateActiveItem={updateActiveItem}
					attribute="height"
					activeItem={activeItem.css.height}
					setCode={setCode}
					placeholder="Enter height"
				/>
			)}
			<FormStyleUnits
				title="margin top"
				id={id}
				updateActiveItem={updateActiveItem}
				attribute="marginTop"
				activeItem={activeItem.css.marginTop}
				setCode={setCode}
				placeholder="Enter margin top"
			/>
			<FormStyleUnits
				title="margin bottom"
				id={id}
				updateActiveItem={updateActiveItem}
				attribute="marginBottom"
				activeItem={activeItem.css.marginBottom}
				setCode={setCode}
				placeholder="Enter margin bottom"
			/>
			<FormStyleUnits
				title="margin right"
				id={id}
				updateActiveItem={updateActiveItem}
				attribute="marginRight"
				activeItem={activeItem.css.marginRight}
				setCode={setCode}
				placeholder="Enter margin right"
			/>
			<FormStyleUnits
				title="margin left"
				id={id}
				updateActiveItem={updateActiveItem}
				attribute="marginLeft"
				activeItem={activeItem.css.marginLeft}
				setCode={setCode}
				placeholder="Enter margin left"
			/>
			<FormOptionColors
				title="color"
				dfcolor="#42526e"
				updateActiveItem={updateActiveItem}
				attribute="color"
				activeItem={activeItem.css.color}
				setCode={setCode}
			/>
			<FormOptionColors
				title="background color"
				updateActiveItem={updateActiveItem}
				attribute="backgroundColor"
				activeItem={activeItem.css.backgroundColor}
				setCode={setCode}
			/>
		</>
	);
}
