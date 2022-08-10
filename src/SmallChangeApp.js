import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from './helpers/Styles'
import { Router } from './routes/Router'
import { store } from './store'

const SmallChangeApp = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <Router />
                <Toaster reverseOrder={false} position="bottom-right" />
            </ThemeProvider>
        </Provider>
    )
}

export default SmallChangeApp