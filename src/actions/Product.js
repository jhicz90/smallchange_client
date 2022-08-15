import { fetchByToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'

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