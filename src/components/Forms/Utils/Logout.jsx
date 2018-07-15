import React, { Component } from "react";
import "../../../styles/global.scss";
import axios from 'axios';

export default class Logout extends Component {
    componentDidMount() {
        axios.get('/api/admin/logout').then(res => {
            console.log(res.data.loggedOut)
            if(res.data.loggedOut){
                window.location.href = '/';
            }
        }).catch( err => console.log(err)) 
    }
    render() {
        return <div style={{color: "white"}}> logging you out... </div>
    }
}