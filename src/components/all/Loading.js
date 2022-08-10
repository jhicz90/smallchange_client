import React from 'react'
import { MoonLoader } from 'react-spinners'
import { CenterInPage, FullPage } from '../../helpers/Styles'

export const Loading = () => {
    return (
        <FullPage>
            <CenterInPage>
                <h4>Cargando...</h4>
                <MoonLoader color='#1f6bff' />
            </CenterInPage>
        </FullPage>
    )
}