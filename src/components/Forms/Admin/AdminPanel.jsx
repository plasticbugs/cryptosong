import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
    return (
        <div 
            style={{
            color:"white",
            padding: "2px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }}>
            <Link to='/admin/edit'>EDIT OPTIONS |</Link>
            <Link to='/admin/add_admin'> ADD ADMIN |</Link>
            <Link to='/admin/change_password'> CHANGE PASSWORD | </Link>
            <Link to='/admin/logout'> LOGOUT</Link>
        </div>
    )
}
module.exports = AdminPanel;