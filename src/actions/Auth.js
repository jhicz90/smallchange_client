import { fetchByToken, fetchNoToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'
import { baseFilesURL } from '../types/Url'

export const startLogin = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(loginCheck())
        const resp = await fetchNoToken({
            endpoint: 'users/auth-via-email',
            data: { email, password },
            method: 'POST',
            messageOk: `Inicio de sesión correctamente con: ${email}`,
            messageError: `Los datos ingresados no son los correctos`
        })

        if (resp.ok) {
            const { token, user } = resp.data
            const { email, profile } = user
            const collection = profile['@collectionId']
            const id = profile['id']
            const userId = profile['userId']
            const name = profile['name']
            const avatar = profile['avatar'].length === 0 ? '' : `${baseFilesURL}/${collection}/${id}/${profile['avatar']}`

            localStorage.setItem('token', token)

            dispatch(login({ uid: userId, email, name, avatar }))
        } else {
            dispatch(loginCheckFail())
        }
    }
}

export const startRegister = ({ email, password, passwordConfirm }) => {
    return async (dispatch) => {

        const resp = await fetchNoToken({
            endpoint: 'users',
            data: { email, password, passwordConfirm },
            method: 'POST',
            messageOk: `El usuario con el correo: ${email} se registro exitosamente`,
            messageError: `La cuenta no se pudo registrar`
        })

        if (resp.ok) {
            dispatch(startLogin({ email, password }))
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
        const resp = await fetchByToken({ endpoint: 'users/refresh', method: 'POST', notify: false })

        if (resp.ok) {
            const { token, user } = resp.data
            const { email, profile } = user
            const collection = profile['@collectionId']
            const id = profile['id']
            const userId = profile['userId']
            const name = profile['name']
            const avatar = profile['avatar'].length === 0 ? '' : `${baseFilesURL}/${collection}/${id}/${profile['avatar']}`

            localStorage.setItem('token', token)

            dispatch(login({ uid: userId, email, name, avatar }))
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