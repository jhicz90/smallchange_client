import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

const TableStyle = styled(Table)`
    background-color: transparent;
    margin-bottom: 0 !important;
`

export const TableMixed = ({ columns = [], data = [] }) => {

    const columnsTable = columns.map(({ key, name = '' }) => {
        return <th key={key || nanoid()}>
            {name}
        </th>
    })

    const rowsTable = data.map((d, i) =>
        <tr key={nanoid()}>
            {
                columns.map(({ key, renderRow }) => {
                    return <td key={nanoid()}>
                        {
                            renderRow
                                ?
                                renderRow(d)
                                :
                                d[key]
                        }
                    </td>
                })
            }
        </tr>
    )

    return (
        <Card className='overflow-hidden'>
            <TableStyle striped>
                <thead>
                    <tr>
                        {columnsTable}
                    </tr>
                </thead>
                <tbody>
                    {rowsTable}
                </tbody>
            </TableStyle>
        </Card>
    )
}
