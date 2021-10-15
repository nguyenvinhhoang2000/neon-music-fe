import React from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
};

function Input(props) {
  const { type, placeholder, className } = props;
  return (
    <input
      type={type}
      className={`form-control ${className}`}
      placeholder={placeholder}
    />
  );
}

export default Input;
