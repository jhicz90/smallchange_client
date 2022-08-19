import { Actions } from '../types/Actions'

const initialState = {
    sidebar: true,
    sidebarMobile: false,
    modalScanCode: false,
    modalSetCode: null
}

export const UIReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.showSidebar:
            return {
                ...state,
                sidebar: true
            }

        case Actions.hideSidebar:
            return {
                ...state,
                sidebar: false
            }

        case Actions.sidebarMobile:
            return {
                ...state,
                sidebarMobile: action.payload.active
            }

        case Actions.openModalScanCode:
            return {
                ...state,
                modalScanCode: true
            }

        case Actions.closeModalScanCode:
            return {
                ...state,
                modalScanCode: false
            }

        case Actions.setCodeModal:
            return {
                ...state,
                modalSetCode: action.payload
            }

        default:
            return state
    }
}