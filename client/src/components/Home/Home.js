import React, { useState, useEffect, useContext } from 'react';

import { Container,Typography, Grow, Grid } from '@material-ui/core';
import { Form } from '../Posts/Form/Form';
// import { GlobalProvider } from './context/GlobalContext';
import { GlobalContext } from '../../context/GlobalContext';
import  { Posts } from '../Posts/Posts';
const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const { getPosts,posts } = useContext(GlobalContext);
    useEffect(()=>{
      getPosts();
  },[currentId])  

    return (

        
       
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
     
   
    )
}

export default Home
