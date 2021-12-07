import React,{useContext,useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import {Post} from './Post/Post';
import useStyles from './styles';
import { GlobalContext } from '../../context/GlobalContext';

export const Posts = ({setCurrentId}) => {
    
    const { posts,getPosts,isLoading } = useContext(GlobalContext);
    useEffect(()=>{
      getPosts();
  },[])        
    const classes= useStyles();
    // if (!posts.length && !isLoading) return 'No posts';
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts?.posts?.map((post) => (
                <Grid key={post._id}  item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          )
    )
}
