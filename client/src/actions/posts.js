import * as api from '../api'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, GET_POST } from '../constants/actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts()
        return dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post)
        return dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (post, id) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(post, id)
        return dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)
        dispatch({type: LIKE_POST, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchPost(id)
        dispatch({type: GET_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}