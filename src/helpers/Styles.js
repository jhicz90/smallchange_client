import { Card } from 'react-bootstrap'
import styled from 'styled-components'

export const mainTheme = {
    header: '60px',
    bg: 'whitesmoke',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
    spaceBottom: '3rem'
}

export const FullPage = styled.div`
    position: relative;
    height: 100%;
`
export const CenterInPage = styled.div`
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

export const GroupItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    
    @media (min-width: ${props => props.theme.lg}) {
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5rem; 
    }
`

export const CardSub = styled(Card)`
    background-color: #f6f8fa;
    border: 1px solid hsla(210,18%,87%,1);
`