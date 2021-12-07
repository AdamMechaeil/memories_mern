import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';
import axios from 'axios';
import authReducer from "./Auth";

const initialState = {

    posts: [],
    user: null,
    isLoading:false,
    post:null,
    numberOfPages:0

}

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    const [poststate, dispatch] = useReducer(AppReducer, initialState.posts)
    const [userstate, dispatchuser] = useReducer(authReducer, initialState.user)



    // Actions

    // async function getPosts() {

    //     const { data } = await API.get('/posts');


    //     try {

    //         dispatch({
    //             type: 'FETCH_ALL',
    //             payload: data

    //         });

    //     } catch (error) {

    //         dispatch({
    //             type: 'ERROR',
    //             payload: error
    //         });

    //     }

    // }


     async function getPost(id){
        try {
            dispatch({ type: 'START_LOADING' });
            
            const { data } = await API.get(`/posts/${id}`);


            dispatch({ type: 'FETCH_POST', payload: { post: data } });
        } catch (error) {
            console.log(error);
        }
    };

    async function getPosts(page)  {
        try {
            dispatch({ type: 'START_LOADING ' });
            const { data: { data, currentPage, numberOfPages } } = await API.get(`/posts?page=${page}`);
            dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });
            dispatch({ type: 'END_LOADING' });
        } catch (error) {
            console.log(error);
        }
    };

     async function getPostsBySearch(searchQuery){
        try {
            dispatch({ type: 'START_LOADING' });
            const { data: { data } } = await API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

            dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });
            dispatch({ type: 'END_LOADING' });
        } catch (error) {
            console.log(error);
        }
    };

    async function createPost(post) {

        // const config = {

        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }

        // }


        try {
            const { data } = await API.post('/posts', post);

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


    async function updatePost(id, updatedPost) {

        try {

            const { data } = await API.patch(`/posts/${id}`, updatedPost);

            dispatch({
                type: 'UPDATE',
                payload: data
            })

        } catch (error) {
            console.log(error)
        }


    }


    async function likePost(id) {

        try {

            const { data } = await API.patch(`/posts/${id}/likePost`);
            dispatch({
                type: 'UPDATE',
                payload: data
            })

        } catch (error) {
            console.log(error)
        }


    }

    async function deletePost(id) {

        try {


            await API.delete(`/posts/${id}`);

            dispatch({

                type: 'DELETE',
                payload: id

            })

        } catch (error) {
            console.log(error);
        }

    }

    async function googleSignIn(result, token) {
        try {


            const data = { result, token };

            dispatchuser({
                type: 'AUTH',
                payload: {

                    data

                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function logout() {
        try {
            dispatchuser({
                type: 'LOGOUT'
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function signin(formData, history) {

        try {

            const { data } = await API.post(`/user/signin`, formData);

            dispatchuser(
                {
                    type: 'AUTH',
                    payload: {
                        data
                    }
                }
            );

            history.push('/');

        } catch (error) {
            console.log(error);
        }

    }

    async function signup(formData, history) {

        try {
            const result = await API.post(`/user/signup`, formData);
            const data = result.data
            dispatchuser(
                {
                    type: 'AUTH',
                    payload: {
                        data
                    }

                }
            )

            history.push('/');

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <GlobalContext.Provider value={{
            posts: poststate,
            user: userstate,
            isLoading:poststate.isLoading,
            post:poststate.post,
            numberOfPages:poststate.numberOfPages,
            getPosts,
            getPost,
            getPostsBySearch,
            createPost,
            deletePost,
            updatePost,
            likePost,
            googleSignIn,
            logout,
            signin,
            signup
        }
        }>
            {children}
        </GlobalContext.Provider>


    )


}