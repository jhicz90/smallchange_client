import React from 'react'
import styled from 'styled-components'
import { SliderMixed } from '../../components/all/SliderMixed'

const SliderWeb = styled(SliderMixed)`
    height: calc(100vh - ${props => props.theme.header});
`

export const Home = () => {
    return (
        <>
            <SliderWeb
                slides={[
                    {
                        src: '/assets/banner1.jpg'
                    },
                    {
                        src: '/assets/banner3.jpg'
                    }
                ]}
            />
            <p>Hola, aqui estarán todas las noticias de la JASS</p>
        </>
    )
}
