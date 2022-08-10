import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const ContentWeb = styled(Container)`
    min-height: 100vh;
    position: relative;
`

export const MainContent = ({ children }) => {
    return (
        <ContentWeb fluid className="g-0">
            {children}
        </ContentWeb>
    )
}
