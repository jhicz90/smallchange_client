import { Actions } from '../types/Actions'

const initialState = {
    search: '',
    list: [],
    loadingList: false,
    active: {},
    modalNew: false,
    activeNew: {}
}

export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.loadListCategory:
            return {
                ...state,
                list: [...action.payload]
            }

        case Actions.startLoadingListCategory:
            return {
                ...state,
                loadingList: true
            }

        case Actions.stopLoadingListCategory:
            return {
                ...state,
                loadingList: false
            }

        case Actions.loadActiveCategory:
            return {
                ...state,
                active: { ...action.payload }
            }

        case Actions.editActiveCategory:
            return {
                ...state,
                active: { ...state.active, ...action.payload }
            }

        case Actions.removeActiveCategory:
            return {
                ...state,
                active: {}
            }

        case Actions.searchCategory:
            return {
                ...state,
                search: action.payload.search
            }

        case Actions.openModalNewCategory:
            return {
                ...state,
                modalNew: true
            }

        case Actions.closeModalNewCategory:
            return {
                ...state,
                modalNew: false
            }

        case Actions.loadActiveNewCategory:
            return {
                ...state,
                activeNew: { ...action.payload }
            }

        case Actions.editActiveNewCategory:
            return {
                ...state,
                activeNew: { ...state.activeNew, ...action.payload }
            }

        case Actions.removeActiveNewCategory:
            return {
                ...state,
                activeNew: {}
            }

        default:
            return state
    }
}