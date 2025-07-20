import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

export default function FormOptionRadio({
  placeholder,
  radioOptions,
  id,
  onChange,
}) {
  const [options, setOptions] = useState([
    { value: "Option A", label: "Option A" },
  ]);
  useEffect(() => {
    if (onChange) onChange({ target: { value: options } });
  }, [options]);
  useEffect(() => {
    setOptions(radioOptions);
  }, [id]);
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
    <div className="position-relative">
      <div className="task-radio-layout" key={id}>
        {options.map((option, index) => (
          <div key={index}>
            <div className="task-option-item mb-2 d-flex">
              <label htmlFor={`option-${index}`} className="form-label">
                {`Option ${index + 1}`}
              </label>
              <FaTrash
                color="red"
                className="task-option-bin"
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.splice(index, 1);
                  if (newOptions.length === 0) {
                    newOptions.push(
                      { label: "Option A", value: "Option A" },
                      { label: "Option B", value: "Option B" },
                      { label: "Option C", value: "Option C" }
                    );
                  }
                  setOptions(newOptions);
                }}
              />
            </div>
            <div className="ms-3 mb-2">
              <div className="flex-between mb-2">
                <label htmlFor={`option-${index}`} className="form-label">
                  Label
                </label>
                <Input
                  id={`option-${index}`}
                  placeholder={placeholder}
                  value={option.label}
                  onChange={(e) =>
                    handleLabelOptionChange(index, e.target.value)
                  }
                />
              </div>
              <div className="flex-between">
                <label htmlFor={`option-${index}`} className="form-label">
                  Value
                </label>
                <Input
                  id={`option-${index}`}
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
  );
}
