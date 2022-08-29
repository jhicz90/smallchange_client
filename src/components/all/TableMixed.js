import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

const TableStyle = styled(Table)`
    background-color: transparent;
    margin-bottom: 0 !important;
`

export const TableMixed = ({ columns = [], data = [], noData = null, className }) => {

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
        <Card className={`overflow-hidden ${className}`}>
            <TableStyle striped responsive>
                <thead>
                    <tr>
                        {columnsTable}
                    </tr>
                </thead>
                <tbody>
                    {
                        rowsTable.length > 0
                            ? rowsTable
                            : <tr>
                                <td
                                    className='p-2 text-center'
                                    colSpan={columnsTable.length}
                                >
                                    {noData || 'No hay datos que mostar'}
                                </td>
                            </tr>
                    }
                </tbody>
            </TableStyle>
        </Card>
    )
}
