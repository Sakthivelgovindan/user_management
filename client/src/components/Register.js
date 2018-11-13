import React from 'react';
import * as rs from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import "./Register.css";

const history = createHistory({ forceRefresh: true });

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            api_key: '',
            secret_key: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            api_key: this.state.api_key,
            secret_key: this.state.secret_key
        }

        fetch('http://localhost:5000/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
                    })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if(data.status === "inserted"){
                    history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <h2>Register</h2>
                <rs.Card>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Username</Label>
                            <Input type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={e => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={e => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Password</Label>
                            <Input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={e => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">API Key</Label>
                            <Input type="text" name="api_key" placeholder="Enter API Key" value={this.state.api_key} onChange={e => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Secret Key</Label>
                            <Input type="text" name="secret_key" placeholder="Enter Secret Key" value={this.state.secret_key} onChange={e => this.handleChange(e)} />
                        </FormGroup>

                        <Button onClick={(e) => this.onSubmit(e)}>Submit</Button>
                    </Form>
                </rs.Card>
            </div>
        );
    }
}

export default Register;