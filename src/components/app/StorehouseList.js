import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { TableMixed, TimeAgo } from '../all'

export const StorehouseList = () => {

    const dispatch = useDispatch()
    const { list, search } = useSelector(state => state.storehouse)
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
            key: 'quantity',
            name: 'Cantidad',
            renderRow: (row) => {
                return <>{row.quantity}</>
            }
        },
        {
            key: 'priceq',
            name: 'Precio total (S/.)',
            renderRow: (row) => {
                return <>{(row.price * row.quantity).toFixed(2)}</>
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
        // dispatch(startListProduct())
    }, [valueSearch, dispatch])

    return (
        <TableMixed columns={columns} data={list} />
    )
}
