import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const ContentApp = styled(Container)`
    padding-top: ${props => props.theme.header};
    height: 100vh;
    width: 80% !important;
`

export const MainContent = ({ children }) => {
    return (
        <ContentApp>
            {children}
        </ContentApp>
    )
}
