import React from 'react'
import { MoonLoader } from 'react-spinners'
import { CenterInPage, FullPage } from '../../helpers/Styles'

export const Loading = () => {
    return (
        <FullPage>
            <CenterInPage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <img src={'/logo.png'} alt="logo" width={128} height={128} className="d-inline-block align-top" />
                    <MoonLoader color='#1f6bff' />
                </div>
            </CenterInPage>
        </FullPage>
    )
}