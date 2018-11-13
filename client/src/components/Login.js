import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import createHistory from 'history/createBrowserHistory';
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
const history = createHistory({ forceRefresh: true });


class LoginUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: false
    }
  }
  render() {


    let responseGoogle = function (response) {

      console.log(response);

      let data = {
        email: response.w3.U3,
        username: response.w3.ig
      }
      fetch('http://localhost:5000/googleAuth', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          return res.json();

        })
        .then(response => {
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem('user_hash', response.user_hash);
            localStorage.setItem('email', response.email);
            history.push('/');

          }
        })
        .catch(err => {
          console.log(err);
        });

    }


    return (
      <div>
        <div className="google_login">
          <GoogleLogin
            clientId="158230128226-pdaarfr90c2c07kqup6fqs83asrp7in8.apps.googleusercontent.com"
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
          <Button variant="outlined" >
            LOGIN
    </Button>
        </div>
        <div className="login_btn signup_btn">
          <Button variant="outlined">
            SIGN UP
    </Button>
        </div>
      </div>
    );
  }
}


function Login(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <LoginUI />
    </Card>
  );
}

export default withStyles(styles)(Login);
