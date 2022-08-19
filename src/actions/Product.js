import { fetchByToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'

export const startListProduct = () => {
    return async (dispatch, getState) => {
        const { search } = getState().product

        dispatch(startLoadingListProduct())

        const resp = await fetchByToken({
            endpoint: 'product/list',
            params: { search }
        })

        if (resp.ok) {
            dispatch(loadListProduct(resp.docs))
        } else {
            dispatch(loadListProduct([]))
        }

        dispatch(stopLoadingListProduct())
    }
}

export const startNewProduct = () => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `product/create/new`
        })

        if (resp.ok) {
            dispatch(loadActiveNewProduct(resp.product))
            dispatch(openModalNewProduct())
        }
    }
}

export const startSaveNewProduct = ({ next = false }) => {
    return async (dispatch, getState) => {
        const { activeNew } = getState().product

        const resp = await fetchByToken({
            endpoint: `product/create/new`,
            method: 'POST',
            data: activeNew
        })

        if (resp.ok) {
            if (!next) {
                dispatch(closeModalNewProduct())
            } else {
                dispatch(startNewProduct())
            }
            dispatch(removeActiveNewProduct())
            dispatch(startListProduct())
        }
    }
}

export const startGetProduct = (id) => {
    return async (dispatch) => {
        const resp = await fetchByToken({
            endpoint: `product/edit/${id}`
        })

        if (resp.ok) {
            dispatch(loadActiveProduct(resp.product))
        }
    }
}

export const startUpdateActiveProduct = () => {
    return async (dispatch, getState) => {
        const { active } = getState().product
        const { _id } = active

        const updateProduct = {
            ...active
        }

        const resp = await fetchByToken({
            endpoint: `product/edit/${_id}`,
            data: updateProduct,
            method: 'PUT'
        })

        if (resp.ok) {
            dispatch(loadActiveProduct(resp.product))
            dispatch(startListProduct())
        }
    }
}

export const findProduct = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'product/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}

export const loadListProduct = (data) => ({
    type: Actions.loadListProduct,
    payload: data
})

export const startLoadingListProduct = () => ({
    type: Actions.startLoadingListProduct
})

export const stopLoadingListProduct = () => ({
    type: Actions.stopLoadingListProduct
})

export const loadActiveProduct = (data) => ({
    type: Actions.loadActiveProduct,
    payload: data
})

export const editActiveProduct = (data) => ({
    type: Actions.editActiveProduct,
    payload: data
})

export const removeActiveProduct = () => ({
    type: Actions.removeActiveProduct
})

export const inputSearchProduct = ({ search }) => ({
    type: Actions.searchProduct,
    payload: {
        search
    }
})

export const openModalNewProduct = () => ({
    type: Actions.openModalNewProduct
})

export const closeModalNewProduct = () => ({
    type: Actions.closeModalNewProduct
})

export const loadActiveNewProduct = (data) => ({
    type: Actions.loadActiveNewProduct,
    payload: data
})

export const editActiveNewProduct = (data) => ({
    type: Actions.editActiveNewProduct,
    payload: data
})

export const removeActiveNewProduct = () => ({
    type: Actions.removeActiveNewProduct
})