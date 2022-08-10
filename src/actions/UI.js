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