import React from "react";
import PropTypes from "prop-types";

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element, PropTypes.bool])).isRequired
};

export default Main;
