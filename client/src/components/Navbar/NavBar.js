import React,{useState,useContext,useEffect} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import { useHistory,useLocation,Link } from 'react-router-dom';
import useStyles from './Styles.js';
import { GlobalContext } from '../../context/GlobalContext';


export const NavBar = () => {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const history= useHistory();
  const {logout}= useContext(GlobalContext);
  const logOut = () => {
   
    logout();

    history.push('/auth');
 
    setUser(null);
  
  };

 useEffect(()=>{
  const token = user?.token;
  setUser(JSON.parse(localStorage.getItem('profile')))
 },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/"  className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result?.name} src={user.result.imageUrl}>{user.result?.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result?.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
