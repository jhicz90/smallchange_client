import { fetchByToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'

export const startListCategory = () => {
    return async (dispatch, getState) => {
        const { search } = getState().category

        dispatch(startLoadingListCategory())

        const resp = await fetchByToken({
            endpoint: 'category/list',
            params: { search }
        })

        if (resp.ok) {
            dispatch(loadListCategory(resp.docs))
            // dispatch(inputSearchCategory({ search }))
        } else {
            dispatch(loadListCategory([]))
        }

        dispatch(stopLoadingListCategory())
    }
}

export const startCreateCategory = ({ address = '', desc = '', email = '', name, rucid }) => {
    return async (dispatch) => {

        const resp = await fetchByToken({
            endpoint: `category/create/new`,
            data: { name, rucid, desc, address, email },
            method: 'POST'
        })

        if (resp.ok) {
            dispatch(startListCategory())
        }
    }
}

export const searchCategory = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'category/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const newCategory = async (name) => {
    const resp = await fetchByToken({
        endpoint: 'category/create/new',
        data: { name },
        method: 'POST'
    })

    if (resp.ok) {
        return resp.category
    } else {
        return null
    }
}

export const loadListCategory = (data) => ({
    type: Actions.loadListCategory,
    payload: data
})

export const startLoadingListCategory = () => ({
    type: Actions.startLoadingListCategory
})

export const stopLoadingListCategory = () => ({
    type: Actions.stopLoadingListCategory
})

export const loadActiveCategory = (data) => ({
    type: Actions.loadActiveCategory,
    payload: data
})

export const editActiveCategory = (data) => ({
    type: Actions.editActiveCategory,
    payload: data
})

export const removeActiveCategory = () => ({
    type: Actions.removeActiveCategory
})

export const inputSearchCategory = ({ search }) => ({
    type: Actions.searchCategory,
    payload: {
        search
    }
})

export const openModalNewCategory = () => ({
    type: Actions.openModalNewCategory
})

export const closeModalNewCategory = () => ({
    type: Actions.closeModalNewCategory
})

export const loadActiveNewCategory = (data) => ({
    type: Actions.loadActiveNewCategory,
    payload: data
})

export const editActiveNewCategory = (data) => ({
    type: Actions.editActiveNewCategory,
    payload: data
})

export const removeActiveNewCategory = () => ({
    type: Actions.removeActiveNewCategory
})