import axios from 'axios'
import { STORE_CREATE_FAIL, STORE_CREATE_REQUEST, STORE_CREATE_SUCCESS, STORE_DETAILS_FAIL, STORE_DETAILS_REQUEST, STORE_DETAILS_SUCCESS, STORE_LIST_FAIL, STORE_LIST_REQUEST, STORE_LIST_SUCCESS, STORE_UPDATE_FAIL, STORE_UPDATE_REQUEST, STORE_UPDATE_SUCCESS } from '../constants/storeConstants'

export const listStores = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: STORE_LIST_REQUEST })

        const { data } = await axios.get(`/api/stores?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: STORE_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: STORE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createStore = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/stores`,
            {},
            config
        )

        dispatch({
            type: STORE_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateStore = (store) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/stores/${store._id}`,
            store,
            config
        )

        dispatch({
            type: STORE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listStoreDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STORE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/stores/${id}`)

        dispatch({
            type: STORE_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: STORE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}