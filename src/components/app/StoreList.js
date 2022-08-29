import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { startListStore } from '../../actions/Store'
import { Status } from '../all/Status'
import { TimeAgo } from '../all/TimeAgo'
import { Link, useLocation } from 'react-router-dom'
import { TableMixed } from '../all/TableMixed'

export const StoreList = () => {

    const dispatch = useDispatch()
    const { list, search } = useSelector(state => state.store)
    const [valueSearch] = useDebounce(search, 3000)
    const location = useLocation()

    const columns = [
        { key: 'name', name: 'Nombre de la tienda' },
        { key: 'rucid', name: 'RUC' },
        {
            key: 'status',
            name: 'Estado',
            width: 100,
            renderRow: (row) => {
                return <Status status={row.status} />
            }
        },
        {
            key: 'createdAt',
            name: 'Creado',
            renderRow: (row) => {
                return <TimeAgo date={row.createdAt} />
            }
        },
        {
            key: 'updatedAt',
            name: 'Actualizado',
            renderRow: (row) => {
                return <TimeAgo type={2} date={row.updatedAt} />
            }
        },
        {
            name: 'Acción',
            renderRow: (row) => (
                <div className='d-flex gap-2'>
                    <Link to={`/app/stores/${row._id}`} state={{ backgroundLocation: location }}>Editar</Link>
                    <span className='link-primary' style={{ cursor: 'pointer' }}>Eliminar</span>
                </div>
            )
        }
    ]


    useEffect(() => {
        dispatch(startListStore())
    }, [valueSearch, dispatch])

    return (
        <TableMixed columns={columns} data={list} />
    )
}
