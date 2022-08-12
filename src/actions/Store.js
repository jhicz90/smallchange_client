import { fetchByToken } from '../helpers/Fetch'
import { Actions } from '../types/Actions'
import { checkToken } from './Auth'

export const startListStore = () => {
    return async (dispatch, getState) => {
        const { search } = getState().store

        dispatch(startLoadingListStore())

        const resp = await fetchByToken({
            endpoint: 'store/list',
            params: { search }
        })

        if (resp.ok) {
            dispatch(loadListStore(resp.docs))
            // dispatch(inputSearchStore({ search }))
        } else {
            dispatch(loadListStore([]))
        }

        dispatch(stopLoadingListStore())
    }
}

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

export const loadListStore = (data) => ({
    type: Actions.loadListStore,
    payload: data
})

export const startLoadingListStore = () => ({
    type: Actions.startLoadingListStore
})

export const stopLoadingListStore = () => ({
    type: Actions.stopLoadingListStore
})

export const loadActiveStore = (data) => ({
    type: Actions.loadActiveStore,
    payload: data
})

export const editActiveStore = (data) => ({
    type: Actions.editActiveStore,
    payload: data
})

export const removeActiveStore = () => ({
    type: Actions.removeActiveStore
})

export const inputSearchStore = ({ search }) => ({
    type: Actions.searchStore,
    payload: {
        search
    }
})

export const openModalNewStore = () => ({
    type: Actions.openModalNewStore
})

export const closeModalNewStore = () => ({
    type: Actions.closeModalNewStore
})

export const loadActiveNewStore = (data) => ({
    type: Actions.loadActiveNewStore,
    payload: data
})

export const editActiveNewStore = (data) => ({
    type: Actions.editActiveNewStore,
    payload: data
})

export const removeActiveNewStore = () => ({
    type: Actions.removeActiveNewStore
})