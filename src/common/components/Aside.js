import React from "react";
import PropTypes from "prop-types";

const Aside = ({ children }) => {
  return <aside className="aside">{children}</aside>;
};

Aside.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element, PropTypes.bool])).isRequired
};

export default Aside;
