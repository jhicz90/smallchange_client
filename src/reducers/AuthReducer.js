import { Actions } from '../types/Actions'

const initialState = {
    checking: true,
    checkingLogin: false
    // uid:null,
    // name:null
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.authLoginStart:
            return {
                ...state,
                checkingLogin: true
            }

        case Actions.authLoginFail:
            return {
                ...state,
                checkingLogin: false
            }

        case Actions.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
                checkingLogin: false
            }

        case Actions.authCheckingInit:
            return {
                ...state,
                checking: true
            }

        case Actions.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case Actions.authLogout:
            return {
                checking: false,
                checkingLogin: false
            }

        default:
            return state
    }
}