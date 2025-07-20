import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

export default function CodeBlock({ id, css, onChange }) {
	const editorRef = useRef(null);
	const handleEditorDidMount = (editor) => {
		editorRef.current = editor;
		injectSuggestWidgetCSS();
	};

	const injectSuggestWidgetCSS = () => {
		const style = document.createElement("style");
		style.innerHTML = `
      .monaco-editor .suggest-widget {
        position: absolute !important;
        bottom: 100px !important;
        left: 50px !important;
        width: 200px !important;
        max-width: 200px !important;
      }
    `;
		document.head.appendChild(style);
	};

	return (
		<div
			style={{
				height: "300px",
				border: "1px solid #ddd",
				borderRadius: "6px",
				overflow: "hidden",
			}}
		>
			<Editor
				key={id}
				height="100%"
				language="css"
				theme="vs-black"
				value={css}
				onMount={handleEditorDidMount}
				onChange={(newVal) => {
					onChange?.(newVal);
				}}
				options={{
					fontSize: 14,
					minimap: { enabled: false },
					wordWrap: "on",
					suggestOnTriggerCharacters: true,
					quickSuggestions: true,
				}}
			/>
		</div>
	);
}
