import { STORE_CREATE_FAIL, STORE_CREATE_REQUEST, STORE_CREATE_RESET, STORE_CREATE_SUCCESS, STORE_DETAILS_FAIL, STORE_DETAILS_REQUEST, STORE_DETAILS_SUCCESS, STORE_LIST_FAIL, STORE_LIST_REQUEST, STORE_LIST_SUCCESS, STORE_UPDATE_FAIL, STORE_UPDATE_REQUEST, STORE_UPDATE_RESET, STORE_UPDATE_SUCCESS } from "../constants/storeConstants"

export const storeListReducer = (state = { stores: [] }, action) => {
    switch (action.type) {
        case STORE_LIST_REQUEST:
            return { loading: true, stores: [] }
        case STORE_LIST_SUCCESS:
            return { loading: false, 
                    stores: action.payload.stores,
                    pages: action.payload.pages,
                    page: action.payload.page }
        case STORE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const storeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_CREATE_REQUEST:
            return { loading: true }
        case STORE_CREATE_SUCCESS:
            return { loading: false, success: true, store: action.payload }
        case STORE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case STORE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const storeUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case STORE_UPDATE_REQUEST:
            return { loading: true }
        case STORE_UPDATE_SUCCESS:
            return { loading: false, success: true, store: action.payload }
        case STORE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case STORE_UPDATE_RESET:
            return { store: {} }
        default:
            return state
    }
}

export const storeDetailsReducer = (state = { store: { productList: [] } }, action) => {
    switch (action.type) {
        case STORE_DETAILS_REQUEST:
            return { loading: true, ...state }
        case STORE_DETAILS_SUCCESS:
            return { loading: false, store: action.payload }
        case STORE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}