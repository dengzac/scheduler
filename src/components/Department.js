import React from "react";
import PropTypes from "prop-types";
import "./Department.css"
function Department(props){
    return <div className="department"><span>{props.id + ": " + props.name}</span></div>;
}

Department.propType = {
    name: PropTypes.string.isRequired
};
export default Department;