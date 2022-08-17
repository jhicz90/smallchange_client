import React from 'react'
import { CodeScanner } from '../../components/all/CodeScanner'
import { CheckStoreNew } from '../../components/app/CheckStoreNew'

export const Home = () => {
    return (
        <>
            <CheckStoreNew />
            <CodeScanner onResult={(res) => alert(res)} />
            Bienvenido a SMALLCHANGE!!!
        </>
    )
}
