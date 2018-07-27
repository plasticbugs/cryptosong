import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => (
  <div
    style={{
    color: 'white',
    padding: '2px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }}
  >
    <pre><Link to="/admin/edit">EDIT OPTIONS</Link> |</pre>
    <pre> <Link to="/admin/add_admin">ADD ADMIN</Link> |</pre>
    <pre> <Link to="/admin/change_password">CHANGE PASSWORD</Link> |</pre>
    <pre> <Link to="/admin/logout">LOGOUT</Link></pre>
  </div>
);
module.exports = AdminPanel;
