import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles';
import memories from './images/memories.png';
import { Form } from './components/Posts/Form/Form';
// import { GlobalProvider } from './context/GlobalContext';
import { GlobalContext } from './context/GlobalContext';
import  { Posts } from './components/Posts/Posts'
const App = () => {

    
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const { getPosts,posts } = useContext(GlobalContext);
  useEffect(()=>{
    getPosts();
},[currentId])  
  return (

    
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
   


  );
}

export default App;
