export const Actions = {
    //  AUTH
    authChecking: '[auth] checking login state',
    authCheckingInit: '[auth] init checking login state',
    authCheckingFinish: '[auth] finish checking login state',
    authLoginStart: '[auth] start login',
    authLoginFail: '[auth] start login fail',
    authLogin: '[auth] login',
    authTokenRenewStart: '[auth] start token renew',
    authLogout: '[auth] logout',
    //  AUTH

    //  UI
    showSidebar: '[ui] show sidebar menu',
    hideSidebar: '[ui] hide sidebar menu',
    sidebarMobile: '[ui] sidebar mobile',
    //  UI

    // STORE
    searchStore: '[store] search of stores',
    loadListStore: '[store] list of stores',
    startLoadingListStore: '[store] start loading list of stores',
    stopLoadingListStore: '[store] stop loading list of stores',
    loadActiveStore: '[store] active store',
    editActiveStore: '[store] edit active store',
    removeActiveStore: '[store] remove active store',

    openModalNewStore: '[store] open modal new store',
    closeModalNewStore: '[store] close modal new store',
    loadActiveNewStore: '[store] active new store',
    editActiveNewStore: '[store] edit active new store',
    removeActiveNewStore: '[store] remove active new store',
    // STORE
}