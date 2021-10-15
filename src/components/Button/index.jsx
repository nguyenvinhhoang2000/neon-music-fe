import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  href: PropTypes.any,
};

Button.defaultProps = {
  className: "",
};

function Button(props) {
  const { onClick, children, className, href } = props;
  return (
    <button className={`zm-btn ${className}`} onClick={onClick} href={href}>
      {children}
    </button>
  );
}

export default Button;
