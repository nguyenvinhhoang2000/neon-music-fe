import React from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.bool,
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
      onFocus
    />
  );
}

export default Input;
