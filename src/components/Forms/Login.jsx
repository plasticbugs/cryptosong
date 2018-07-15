import React, { Component } from "react";
import "../../styles/global.scss";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            tries: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.addTries = this.addTries.bind(this);
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
        const { username, password } = this.state;
        axios.post('/api/admin/login',{ username, password }).then(function(res){
            if(res.status === 200 && res.data.status === 'Login successful!'){
                if(path){
                    if(window.location.href.endsWith(path)){
                        window.location.reload();
                    } else {
                        window.location.href = path;
                    }
                } else {
                    window.location.href = '/';
                }
            } else if (tries < 4) {
                tries++;
            } else {
                window.location.href = '/';
            }
            scope.addTries(tries);
        }).catch(err => {console.log(err)})
    }

    addTries(tries) {
        this.setState({tries});
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
                        placeholder="password"
                        value={this.state.password}
                    />
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}