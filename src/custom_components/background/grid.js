import React from "react";
import PropTypes from "prop-types";

export default function Grid({
  color = "#cacaca",
  size = 1,
  className,
  spacing = 15,

  children,
  style = {
    backgroundColor: "white",
    width: "100%",
    minHeight: "100vh",
  },
}) {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `calc(${spacing} * ${size}px) calc(${spacing} * ${size}px)`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};
