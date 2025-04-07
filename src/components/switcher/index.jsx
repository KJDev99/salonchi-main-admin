import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

const Switcher = ({ isActive, onChange, text, id }) => {
  const [enabled, setEnabled] = useState(isActive);

  useEffect(() => {
    setEnabled(isActive);
  }, [isActive]);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "18px",
          userSelect: "none",
        }}
      >
        {text || "Holati"} &nbsp;&nbsp;
        <div style={{ position: "relative" }}>
          <input
            type="checkbox"
            id={id}
            style={{ display: "none" }}
            checked={enabled}
            onChange={handleToggle}
          />
          <div
            style={{
              width: "56px",
              height: "32px",
              borderRadius: "16px",
              backgroundColor: enabled ? "#4caf50" : "#ccc",
              position: "relative",
              transition: "background-color 0.3s",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: enabled ? "28px" : "4px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "left 0.3s",
            }}
          >
            {enabled ? (
              <IoMdCheckmark style={{ color: "#4caf50" }} />
            ) : (
              <MdOutlineClose style={{ color: "red" }} />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default Switcher;
