import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class CustomNavbar extends React.Component {

  constructor(props) {
    super(props);
    var loggedIn = false;

    if(localStorage.getItem('email')){
      loggedIn = true;
    } 

    this.state = {
      loggedIn: loggedIn,
    }
  }


  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('user_hash');
    this.setState = {
      loggedIn  : false
    }
  }

  

  render() {

    const { classes } = this.props;

    return (

 
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link className="link_color" to='/'>BitMex</Link>
          </Typography>
          <Button color="inherit"><Link className="link_color" to='/'>Home</Link></Button>
          <Button color="inherit"><Link className="link_color" to='/about'>About</Link></Button>
          {this.state.loggedIn ? <Button color="inherit"><Link className="link_color" to='/register'>Register</Link></Button> : "" }
          {this.state.loggedIn ? <Button color="inherit"><Link className="link_color" to='/' onClick = {this.logout}>Logout</Link></Button>
          : <Button color="inherit"><Link className="link_color" to='/login'>Login</Link></Button>}
        </Toolbar>
      </AppBar>
    </div>

      );
  }
}


export default withStyles(styles)(CustomNavbar);