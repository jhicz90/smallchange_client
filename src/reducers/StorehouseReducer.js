import { Actions } from '../types/Actions'

const initialState = {
    search: '',
    list: [],
    loadingList: false,
    active: {},
    modalNew: false,
    activeNew: {},
    addNew: {}
}

export const StorehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.loadListStorehouse:
            return {
                ...state,
                list: [...action.payload]
            }

        case Actions.startLoadingListStorehouse:
            return {
                ...state,
                loadingList: true
            }

        case Actions.stopLoadingListStorehouse:
            return {
                ...state,
                loadingList: false
            }

        case Actions.loadActiveStorehouse:
            return {
                ...state,
                active: { ...action.payload }
            }

        case Actions.editActiveStorehouse:
            return {
                ...state,
                active: { ...state.active, ...action.payload }
            }

        case Actions.removeActiveStorehouse:
            return {
                ...state,
                active: {}
            }

        case Actions.searchStorehouse:
            return {
                ...state,
                search: action.payload.search
            }

        case Actions.openModalNewStorehouse:
            return {
                ...state,
                modalNew: true
            }

        case Actions.closeModalNewStorehouse:
            return {
                ...state,
                modalNew: false
            }

        case Actions.loadActiveNewStorehouse:
            return {
                ...state,
                activeNew: { ...action.payload }
            }

        case Actions.editActiveNewStorehouse:
            return {
                ...state,
                activeNew: { ...state.activeNew, ...action.payload }
            }

        case Actions.removeActiveNewStorehouse:
            return {
                ...state,
                activeNew: {}
            }

        default:
            return state
    }
}