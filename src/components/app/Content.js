import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const ContentApp = styled(Container)`
    min-height: 100vh;
    position: relative;
`

export const MainContent = ({ children }) => {
    return (
        <ContentApp fluid className="g-0">
            {children}
        </ContentApp>
    )
}
