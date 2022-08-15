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

    // STORE
    searchProduct: '[product] search of products',
    loadListProduct: '[product] list of products',
    startLoadingListProduct: '[product] start loading list of products',
    stopLoadingListProduct: '[product] stop loading list of products',
    loadActiveProduct: '[product] active product',
    editActiveProduct: '[product] edit active product',
    removeActiveProduct: '[product] remove active product',

    openModalNewProduct: '[product] open modal new product',
    closeModalNewProduct: '[product] close modal new product',
    loadActiveNewProduct: '[product] active new product',
    editActiveNewProduct: '[product] edit active new product',
    removeActiveNewProduct: '[product] remove active new product',
    // STORE
}