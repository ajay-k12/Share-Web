import { AUTH } from "../constants/actionTypes";
import * as api from '../api/index.js'

export const signin = (formData, navigate) => async (dispatch) => {
    const {data} = await api.signIn(formData)
    try {
        // signup
        dispatch({type: AUTH, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    const {data} = await api.signUp(formData)
    try {
        // signup
        dispatch({type: AUTH, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}