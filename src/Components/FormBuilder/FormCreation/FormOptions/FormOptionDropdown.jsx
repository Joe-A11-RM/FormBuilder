import React, { useState, useEffect } from "react";
import { Input, Radio } from "antd";
import { FaTrash } from "react-icons/fa6";
import { Input as AntdInput } from "antd";

export default function FormOptionDropdown({
  placeholder,
  dropdownOptions,
  id,
  onChange,
  setOthers,
  others,
}) {
  const defaultStaticOptions = [
    { label: "Option A", value: "Option A" },
    { label: "Option B", value: "Option B" },
    { label: "Option C", value: "Option C" },
  ];

  const [options, setOptions] = useState([]);
  const [dbKey, setdbKey] = useState("");

  useEffect(() => {
    if (others === "static") {
      const fallback =
        dropdownOptions?.length > 0 ? dropdownOptions : defaultStaticOptions;
      setOptions(fallback);
      setOthers("static");
    } else {
      setdbKey(dropdownOptions?.queryKey || "");
      setOthers("dbkey");
    }
  }, [id, others]);

  useEffect(() => {
    if (!onChange) return;
    if (others === "static") {
      onChange({
        target: {
          value: {
            queryKey: "static",
            data: options,
          },
        },
      });
    } else {
      onChange({
        target: {
          value: {
            queryKey: dbKey,
            data: [],
          },
        },
      });
    }
  }, [options, dbKey, others]);

  const handleLabelOptionChange = (index, newValue) => {
    setOptions((prev) =>
      prev.map((option, i) =>
        i === index ? { ...option, label: newValue } : option
      )
    );
  };

  const handleValueOptionChange = (index, newValue) => {
    setOptions((prev) =>
      prev.map((option, i) =>
        i === index ? { ...option, value: newValue } : option
      )
    );
  };

  const addOption = () => {
    setOptions((prev) => [
      ...prev,
      { label: `Option ${prev.length + 1}`, value: "" },
    ]);
  };

  return (
    <>
      <Radio.Group
        style={{ display: "flex", flexDirection: "row", gap: 8 }}
        onChange={(e) => setOthers(e.target.value)}
        value={others}
        options={[
          { value: "static", label: "Custom data" },
          { value: "dbkey", label: "Database" },
        ]}
      />

      {others === "static" ? (
        <div className="position-relative mt-2">
          <div className="task-radio-layout" key={id}>
            {options.map((option, index) => (
              <div key={index}>
                <div className="task-option-item mb-2 d-flex align-items-center justify-content-between">
                  <label htmlFor={`option-${index}`} className="form-label">
                    {`Option ${index + 1}`}
                  </label>
                  <FaTrash
                    color="red"
                    className="task-option-bin"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOptions((prev) => {
                        const updated = [...prev];
                        updated.splice(index, 1);
                        return updated.length === 0
                          ? defaultStaticOptions
                          : updated;
                      });
                    }}
                  />
                </div>
                <div className="ms-3 mb-2">
                  <div className="flex-between mb-2">
                    <label className="form-label">Label</label>
                    <Input
                      placeholder={placeholder}
                      value={option.label}
                      onChange={(e) =>
                        handleLabelOptionChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-between">
                    <label className="form-label">Value</label>
                    <Input
                      placeholder={placeholder}
                      value={option.value}
                      onChange={(e) =>
                        handleValueOptionChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={addOption}
            className="cursor-pointer text-blue-500 hover:text-blue-700 task-radio-add-btn"
          >
            Add
          </div>
        </div>
      ) : (
        <>
          <label
            htmlFor={id}
            className="form-label d-flex align-items-center mt-2"
          >
            Database key
          </label>
          <AntdInput
            type="text"
            value={dbKey}
            placeholder="Enter Query key"
            onChange={(e) => setdbKey(e.target.value)}
          />
        </>
      )}
    </>
  );
}
