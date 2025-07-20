import { use, useEffect, useState } from "react";

import FormOptionStyle from "./FormOptionLayout/FormOptionStyle";
import { Segmented } from "antd";
import FormOptionMain from "./FormOptionLayout/FormOptionMain";

export default function FormOptions({
  setDroppedItems,
  activeInput,
  items,
  setOthers,
  others,
  collapsed,
}) {
  const [activeOption, setActiveOption] = useState("Main");
  useEffect(() => {
    if (activeInput) {
      setActiveOption("Main");
    }
  }, [activeInput]);
  const activeItem =
    items.find((item) => item.key === activeInput) ||
    items
      .flatMap((item) => item.container || [])
      .find((child) => child.key === activeInput) ||
    {};
  const updateItemFields = (item, field, value) => {
    const keys = field.split(".");

    if (keys.length === 1) {
      const currentValue = item[field];
      return {
        ...item,
        [field]: typeof value === "function" ? value(currentValue) : value,
      };
    } else {
      const [firstKey, ...restKeys] = keys;
      const updatedNested = { ...item[firstKey] };
      let nestedRef = updatedNested;
      let originalRef = item[firstKey];

      for (let i = 0; i < restKeys.length - 1; i++) {
        const key = restKeys[i];
        nestedRef[key] = { ...nestedRef[key] };
        originalRef = originalRef?.[key] ?? {};
        nestedRef = nestedRef[key];
      }

      const lastKey = restKeys[restKeys.length - 1];
      const currentValue = originalRef?.[lastKey];

      nestedRef[lastKey] =
        typeof value === "function" ? value(currentValue) : value;

      return {
        ...item,
        [firstKey]: updatedNested,
      };
    }
  };

  const updateActiveItem = (field, value) => {
    setDroppedItems((prev) =>
      prev.map((item) => {
        if (item.key === activeInput) {
          // Top-level item match
          return updateItemFields(item, field, value);
        }

        // Look for match in container
        if (item.container?.some((child) => child.key === activeInput)) {
          const updatedContainer = item.container.map((child) => {
            if (child.key === activeInput) {
              return updateItemFields(child, field, value);
            }
            return child;
          });

          return {
            ...item,
            container: updatedContainer,
          };
        }

        // No match at all
        return item;
      })
    );
  };
  const parseInlineStyle = (cssString) => {
    const styleContent = cssString.match(/element\.style\s*{([^}]*)}/)?.[1];
    if (!styleContent) return {};

    const styleLines = styleContent
      .split(";")
      .map((line) => line.trim())
      .filter(Boolean);

    const styleObject = {};

    styleLines.forEach((line) => {
      const [prop, value] = line.split(":").map((s) => s.trim());
      if (!prop || !value) return;

      const camelCasedProp = prop.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      styleObject[camelCasedProp] = value;
    });

    return styleObject;
  };

  const generateCssStringFromObject = (styleObject) => {
    if (!styleObject || typeof styleObject !== "object") {
      return "element.style {\n}";
    }

    const cssLines = Object.entries(styleObject).map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `  ${kebabKey}: ${value};`;
    });

    return `element.style {\n${cssLines.join("\n")}\n}`;
  };

  const [code, setCode] = useState("element.style {\n  \n}");

  useEffect(() => {
    // update code view when selected input changes
    if (activeItem?.key) {
      setCode(generateCssStringFromObject(activeItem?.css));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem?.key]);

  return (
    <>
      <div
        className="task-options-layout"
        style={{
          width: !collapsed.optionsCOllapsed ? "24%" : "0%",
          padding: !collapsed.optionsCOllapsed ? "16px" : "0px",
        }}
      >
        {activeItem.key ? (
          <>
            <Segmented
              options={["Main", "Style"]}
              onChange={(value) => {
                setActiveOption(value);
              }}
              value={activeOption}
              className="mb-3 w-100 segmented-full"
            />

            <div className="task-main-options">
              {activeOption === "Main" && (
                <>
                  <FormOptionMain
                    activeInput={activeInput}
                    activeItem={activeItem}
                    updateActiveItem={updateActiveItem}
                    others={others}
                    setOthers={setOthers}
                  />
                </>
              )}
              {activeOption === "Style" && (
                <>
                  <FormOptionStyle
                    activeItem={activeItem}
                    code={code}
                    setCode={setCode}
                    updateActiveItem={updateActiveItem}
                    parseInlineStyle={parseInlineStyle}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="m-auto">
            Select element on form for edit properties
          </div>
        )}
      </div>
    </>
  );
}
