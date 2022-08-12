import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { CapFirstLetter } from '../../helpers/CapitalizeFirstLetter'

export const TimeAgo = ({ date, type = 1 }) => {

    return (
        <>
            {
                type === 1
                    ?
                    <span>{CapFirstLetter(moment(date).format('dddd, DD/MM/yyyy hh:mm A'))}</span>
                    :
                    <span>{CapFirstLetter(moment(date).fromNow())}</span>
            }
        </>
    )
}
