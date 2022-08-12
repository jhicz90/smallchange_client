import { Actions } from '../types/Actions'

const initialState = {
    search: '',
    list: [],
    loadingList: false,
    active: {},
    modalNew: false,
    activeNew: {}
}

export const StoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.loadListStore:
            return {
                ...state,
                list: [...action.payload]
            }

        case Actions.startLoadingListStore:
            return {
                ...state,
                loadingList: true
            }

        case Actions.stopLoadingListStore:
            return {
                ...state,
                loadingList: false
            }

        case Actions.loadActiveStore:
            return {
                ...state,
                active: { ...action.payload }
            }

        case Actions.editActiveStore:
            return {
                ...state,
                active: { ...state.active, ...action.payload }
            }

        case Actions.removeActiveStore:
            return {
                ...state,
                active: {}
            }

        case Actions.searchStore:
            return {
                ...state,
                search: action.payload.search
            }

        case Actions.openModalNewStore:
            return {
                ...state,
                modalNew: true
            }

        case Actions.closeModalNewStore:
            return {
                ...state,
                modalNew: false
            }

        case Actions.loadActiveNewStore:
            return {
                ...state,
                activeNew: { ...action.payload }
            }

        case Actions.editActiveNewStore:
            return {
                ...state,
                activeNew: { ...state.activeNew, ...action.payload }
            }

        case Actions.removeActiveNewStore:
            return {
                ...state,
                activeNew: {}
            }

        default:
            return state
    }
}