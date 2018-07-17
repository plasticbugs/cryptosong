import React, { Component } from "react";
import "../../../styles/global.scss";
import axios from 'axios';

export default class ChgPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newPassword: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }


    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;  
        this.setState({[name]: value});
    }

    submitForm(e) {
        let tries = this.state.tries;
        e.preventDefault();
        const { path } = this.props;
        let scope = this;
        const { username, password, newPassword } = this.state;
        axios.post('/api/admin/set_password',{ username, password, newPassword }).then(function(res){
            if(res.data.success){
                alert('password changed!')
                window.location.href = '/admin';
            } else {
                alert('wrong credentials')
                window.location.href = '/admin/logout';
            }
        }).catch(err => {console.log(err)})
    }

    render() {
        return (
            <div 
                style={{
                color:"white",
                padding: "2px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}>
                Login:
                <form 
                    method="POST"
                    onChange={this.handleChange} 
                    onSubmit={this.submitForm}
                >
                    <br/>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="username"
                        value={this.state.username} 
                    />
                    <br/>
                    <br/>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="current password"
                        value={this.state.password}
                    />
                    <br/>
                    <br/>
                    <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="new password"
                        value={this.state.newPassword}
                    />
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}