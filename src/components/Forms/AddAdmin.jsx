import React, { Component } from "react";
import "../../styles/global.scss";
import axios from 'axios';


export default class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;  
        this.setState({[name]: value});
    }
      
    submitForm(e) {
        e.preventDefault();
        const { username, password, email } = this.state;
        axios.post('/api/add_admin',{ username, password, email }).then(function(res){
            alert(res.data.status);
            window.location.href = '/';
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
                Add Administator:
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
                        type="email" 
                        name="email"
                        placeholder="email"
                        value={this.state.email}
                    />
                    <br/>
                    <br/>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password"
                        value={this.state.password}
                    />
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <a href='/admin'>back</a>
            </div>
        )
    }
}