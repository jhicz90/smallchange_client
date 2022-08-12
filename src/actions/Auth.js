import { fetchByToken, fetchNoToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'

export const startLogin = ({ userpass, password }) => {
    return async (dispatch) => {
        dispatch(loginCheck())
        const resp = await fetchNoToken({
            endpoint: 'usersys/login',
            data: { userpass, password, remenber: true },
            method: 'POST'
        })

        if (resp.ok) {
            const { token, uid, names, surnames, image, stores } = resp

            localStorage.setItem('token', token)

            dispatch(login({ uid, names, surnames, image, stores }))
        } else {
            dispatch(loginCheckFail())
        }
    }
}

export const startRegister = ({ names, surnames, gender, docid, username, email, password, passwordConfirm }) => {
    return async (dispatch) => {

        const resp = await fetchNoToken({
            endpoint: 'usersys/register',
            data: { names, surnames, gender, docid, username, email, password, passwordConfirm },
            method: 'POST'
        })

        if (resp.ok) {
            dispatch(startLogin({ userpass: email, password }))
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        dispatch(logout())
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        dispatch(initChecking())
        await dispatch(checkToken())
        dispatch(finishChecking())
    }
}

export const checkToken = () => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: 'usersys/refresh',
            method: 'POST',
            notify: false
        })

        if (resp.ok) {
            const { token, uid, names, surnames, image, stores } = resp

            localStorage.setItem('token', token)

            dispatch(login({ uid, names, surnames, image, stores }))
        }
    }
}


export const loginCheck = () => ({
    type: Actions.authLoginStart
})

export const loginCheckFail = () => ({
    type: Actions.authLoginFail
})

export const login = (user) => ({
    type: Actions.authLogin,
    payload: user
})

export const logout = () => ({
    type: Actions.authLogout
})

export const initChecking = () => ({
    type: Actions.authCheckingInit
})

export const finishChecking = () => ({
    type: Actions.authCheckingFinish
})