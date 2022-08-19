import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { startListProduct } from '../../actions/Product'
import { Status } from '../all/Status'
import { TimeAgo } from '../all/TimeAgo'
import { Link, useLocation } from 'react-router-dom'
import { TableMixed } from '../all/TableMixed'

export const ProductList = () => {

    const dispatch = useDispatch()
    const { list, search } = useSelector(state => state.product)
    const [valueSearch] = useDebounce(search, 3000)
    const location = useLocation()

    const columns = [
        { key: 'name', name: 'Nombre del producto' },
        { key: 'code', name: 'Código' },
        {
            key: 'price',
            name: 'Precio (S/.)',
            renderRow: (row) => {
                return <>{row.price.toFixed(2)}</>
            }
        },
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
            renderRow: (row) => <div className='d-flex gap-2'>
                <Link to={`/app/products/${row._id}`} state={{ backgroundLocation: location }}>Editar</Link>
                <span className='link-primary' style={{ cursor: 'pointer' }}>Eliminar</span>
            </div>
        }
    ]


    useEffect(() => {
        dispatch(startListProduct())
    }, [valueSearch, dispatch])

    return (
        <TableMixed columns={columns} data={list} />
    )
}
