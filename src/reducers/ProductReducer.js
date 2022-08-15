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

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.loadListProduct:
            return {
                ...state,
                list: [...action.payload]
            }

        case Actions.startLoadingListProduct:
            return {
                ...state,
                loadingList: true
            }

        case Actions.stopLoadingListProduct:
            return {
                ...state,
                loadingList: false
            }

        case Actions.loadActiveProduct:
            return {
                ...state,
                active: { ...action.payload }
            }

        case Actions.editActiveProduct:
            return {
                ...state,
                active: { ...state.active, ...action.payload }
            }

        case Actions.removeActiveProduct:
            return {
                ...state,
                active: {}
            }

        case Actions.searchProduct:
            return {
                ...state,
                search: action.payload.search
            }

        case Actions.openModalNewProduct:
            return {
                ...state,
                modalNew: true
            }

        case Actions.closeModalNewProduct:
            return {
                ...state,
                modalNew: false
            }

        case Actions.loadActiveNewProduct:
            return {
                ...state,
                activeNew: { ...action.payload }
            }

        case Actions.editActiveNewProduct:
            return {
                ...state,
                activeNew: { ...state.activeNew, ...action.payload }
            }

        case Actions.removeActiveNewProduct:
            return {
                ...state,
                activeNew: {}
            }

        default:
            return state
    }
}