import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../Login.jsx';
import Logout from './Logout.jsx';
import AddAdmin from '../AddAdmin.jsx';
import AdminPanel from '../Admin/AdminPanel.jsx';
import ChgPassword from '../Admin/ChgPassword.jsx';
import EditPanel from '../Admin/EditPanel.jsx';
import axios from 'axios';

export default class IsAdmin extends Component {
    //..
    constructor(props) {
        super(props);
        this.state = {
            admin: null
        }
        this.redirectNonAdmin = this.redirectNonAdmin.bind(this);
        this.adminRoutes = this.adminRoutes.bind(this);
    }

    componentDidMount() {
        axios.get('/api/admin').then(res => {
            if(res.data.success) {
                this.setState({admin:res.data.admin}) 
            };
        }).catch(err => err)
    }
    //..
    redirectNonAdmin() {
        if(this.state.admin === 0){
            return <Login 
                {...this.props} 
                onSuccess={this.props.path}
                />
        } else if (this.state.admin === 1) {
            return this.adminRoutes(this.props.path);
        }
    }

    // Switch can be expanded to include other Admin Only routes 
    adminRoutes(path) {
        let rtnVar;
        switch (path) {
            case '/admin/change_password':
                rtnVar = <ChgPassword {...this.props} /> 
                break;
            case '/admin/add_admin':
                rtnVar = <AddAdmin {...this.props} /> 
                break;
            case '/admin':
                rtnVar = <AdminPanel {...this.props} />  
                break;  
            case '/admin/edit':
                rtnVar = <EditPanel {...this.props} />
                break;
            case '/admin/logout':
                rtnVar = <Logout {...this.props} />
                break;
            default:
                rtnVar = <div style={{color:"white"}}>DEFAULT</div>
        }
        return rtnVar;
    }
    
    render(){
        return (<Fragment>{
            this.state.admin === null 
            ? <div style={{color:"white"}}>loading!</div>
            : <div>{this.redirectNonAdmin()}</div>
        }</Fragment>)
    }
}