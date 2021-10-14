import React, {createContext,useReducer} from "react";
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState={
    
    posts:[],
    error:null


}


// Create Context

export const GlobalContext = createContext(initialState);

export const GlobalProvider= ({children}) => {

 const [state,dispatch] = useReducer(AppReducer,initialState)


 // Actions

 async function getPosts(){

    const { data } = await axios.get('http://localhost:5000/posts');
   console.log(data)
    try {
        
        dispatch({
            type: 'FETCH_ALL',
            payload: data
    
          });

    } catch (error) {
        
        dispatch({
            type: 'ERROR',
            payload: error
          });

    }

 }

     async function createPost(post) {
           
        // const config = {
          
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }

        // }
        
    
        try {
            const {data} =  await axios.post('http://localhost:5000/posts',post);
                
            dispatch({
                    
                type: 'CREATE_POST',
                payload: data

            })

        } catch (error) {
         

            console.log(error);
            // dispatch({
               
            //     type: 'FAILED',
            //     payload: error

            // });

        }


     }


     async function updatePost(id,updatedPost){
         
        try {

          const {data}  = await axios.patch(`http://localhost:5000/posts/${id}`,updatedPost);
       
           dispatch({
               type:'UPDATE',
               payload: data
           })
            
        } catch (error) {
          console.log(error)
        }
         

     }


     async function likePost(id){

        try {
            
            const {data} = await axios.patch(`http://localhost:5000/posts/${id}/likePost`);
            dispatch({
                type:'UPDATE',
                payload: data
            })

        } catch (error) {
            console.log(error)
        }
         

     }

     async function deletePost(id){

        try {


           await axios.delete(`http://localhost:5000/posts/${id}`);

            dispatch({
                    
                type: 'DELETE',
                payload: id

            })
            
        } catch (error) {
            console.log(error);
        }

     }


      return(
<GlobalContext.Provider value={{
    posts:state.posts,
    getPosts,
    createPost,
    deletePost,
    updatePost,
    likePost
}
}>
  {children}
</GlobalContext.Provider>
         

      )


}