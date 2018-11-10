// import React, { Component } from "react";
// import * as rs from 'reactstrap';
// import createHistory from 'history/createBrowserHistory';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
// import "./Login.css";

// const history = createHistory({ forceRefresh: true });

// export default class Login extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       showResults: false
//     }
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }


//   onSubmit = (e) => {
//     e.preventDefault();
//     let form = {
//       name: this.state.username,
//       email: this.state.password
//     }

//     console.log(form);
//     fetch('http://localhost:5000/login', {

//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(form)
//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         console.log(data.length);
//         this.setState({
//           username: '',
//           password: ''
//         });
//         if (data.length === 0) {
//           this.setState({
//             showResults: true
//           })
//         }
//         else {
//           history.push('/');
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }



//   render() {

//     const responseGoogle = (response) => {
//       console.log(response);
//     }

//     const responseFacebook = (response) => {
//       console.log(response);
//     }

//     return (
//       <div className="container">

//       </div>
//     );
//   }
// }



// class LoginButton extends React.Component {

//   render() {

//     return (
//       <div>
//         <p>Username and password incorrect.</p>
//       </div>

//     );
//   }
// }



import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import './Login.css';

const styles = {
  card: {
    minWidth: 375,
    width: 10,
    minHeight: 500,
    margin: '0 auto',
    marginTop: 50
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

};

const responseGoogle = (response) => {
  console.log(response);
}

function Login(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <div>
        <div className="google_login">
          <GoogleLogin
            clientId="158230128226-dqnr556hljfdbgimna0feasn7rnnj8eb.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <span> Login with Google</span>
          </GoogleLogin>
        </div>
        <div className="other_msg"> 
          <span>OR USE YOUR EMAIL</span>
        </div>

        <div className="login_btn">
          <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
            LOGIN
      </Button>
        </div>
        <div className="login_btn signup_btn">
          <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
            SIGN UP
      </Button>
        </div>
      </div>

    </Card>
  );
}

export default withStyles(styles)(Login);
