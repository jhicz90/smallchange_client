import { Actions } from '../types/Actions'

const initialState = {
    sidebar: true,
    sidebarMobile: false,
    modalScanCode: false
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

        case Actions.openScanCode:
            return {
                ...state,
                modalScanCode: true
            }

        case Actions.closeScanCode:
            return {
                ...state,
                modalScanCode: false
            }

        default:
            return state
    }
}