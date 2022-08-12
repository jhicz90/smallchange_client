import React from 'react'
import { FcOk, FcCancel } from 'react-icons/fc'

export const Status = ({ status }) => {
    return (
        <>
            {
                status
                    ?
                    <FcOk size={20} />
                    :
                    <FcCancel size={20} />
            }
        </>
    )
}
