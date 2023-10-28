import React from "react";

const Input = ({ textArea,extraStyle, ...props }) => {
  if (textArea) {
    return (
      <textarea
        {...props}
        style={{
          fontSize: "1rem",
          padding:'1rem',
          margin: ".5rem 0 2rem",
          borderRadius: "0.5rem",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid #000000AA",
          ...extraStyle,
        }}
      />
    );
  }
  return (
    <input
      {...props}
      style={{
        fontSize: "1rem",
        padding:'1rem',
        margin: ".5rem 0 2rem",
        borderRadius: "0.5rem",
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid #000000AA",
        ...extraStyle,
      }}
    />
  );
};

export default Input;
