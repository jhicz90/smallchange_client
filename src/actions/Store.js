import { fetchByToken } from '../helpers/Fetch'
import { checkToken } from './Auth'

export const startCreateStore = ({ address = '', desc = '', email = '', name, rucid }) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `store/create/new`,
            data: { name, rucid, desc, address, email },
            method: 'POST'
        })

        if (resp.ok) {
            dispatch(checkToken())
        }
    }
}

export const checkStoreInUser = async () => {
    const resp = await fetchByToken({
        endpoint: 'store/storeInUser'
    })

    if (resp.ok) {
        return resp.check
    } else {
        return false
    }
}