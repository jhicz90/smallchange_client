import { Actions } from '../types/Actions'

export const showSidebar = () => ({
    type: Actions.showSidebar
})

export const hideSidebar = () => ({
    type: Actions.hideSidebar
})

export const mobile = (active) => ({
    type: Actions.sidebarMobile,
    payload: {
        active
    }
})

export const finishScanCode = (decodedText) => {
    return async (dispatch, getState) => {
        const { modalSetCode } = getState().ui

        if (decodedText.length > 0) {
            modalSetCode(decodedText)
        }
        
        dispatch(closeModalScanCode())
    }
}

export const openModalScanCode = () => ({
    type: Actions.openModalScanCode
})

export const closeModalScanCode = () => ({
    type: Actions.closeModalScanCode
})

export const setCodeModal = (setCode) => ({
    type: Actions.setCodeModal,
    payload: setCode
})