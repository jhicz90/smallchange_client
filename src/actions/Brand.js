import { fetchByToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'

export const startListBrand = () => {
    return async (dispatch, getState) => {
        const { search } = getState().brand

        dispatch(startLoadingListBrand())

        const resp = await fetchByToken({
            endpoint: 'brand/list',
            params: { search }
        })

        if (resp.ok) {
            dispatch(loadListBrand(resp.docs))
            // dispatch(inputSearchBrand({ search }))
        } else {
            dispatch(loadListBrand([]))
        }

        dispatch(stopLoadingListBrand())
    }
}

export const startCreateBrand = ({ address = '', desc = '', email = '', name, rucid }) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `brand/create/new`,
            data: { name, rucid, desc, address, email },
            method: 'POST'
        })

        if (resp.ok) {
            dispatch(startListBrand())
        }
    }
}

export const searchBrand = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'brand/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const newBrand = async (name) => {
    const resp = await fetchByToken({
        endpoint: 'brand/create/new',
        data: { name },
        method: 'POST'
    })

    if (resp.ok) {
        return resp.brand
    } else {
        return null
    }
}

export const loadListBrand = (data) => ({
    type: Actions.loadListBrand,
    payload: data
})

export const startLoadingListBrand = () => ({
    type: Actions.startLoadingListBrand
})

export const stopLoadingListBrand = () => ({
    type: Actions.stopLoadingListBrand
})

export const loadActiveBrand = (data) => ({
    type: Actions.loadActiveBrand,
    payload: data
})

export const editActiveBrand = (data) => ({
    type: Actions.editActiveBrand,
    payload: data
})

export const removeActiveBrand = () => ({
    type: Actions.removeActiveBrand
})

export const inputSearchBrand = ({ search }) => ({
    type: Actions.searchBrand,
    payload: {
        search
    }
})

export const openModalNewBrand = () => ({
    type: Actions.openModalNewBrand
})

export const closeModalNewBrand = () => ({
    type: Actions.closeModalNewBrand
})

export const loadActiveNewBrand = (data) => ({
    type: Actions.loadActiveNewBrand,
    payload: data
})

export const editActiveNewBrand = (data) => ({
    type: Actions.editActiveNewBrand,
    payload: data
})

export const removeActiveNewBrand = () => ({
    type: Actions.removeActiveNewBrand
})