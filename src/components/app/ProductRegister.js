import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalNewProduct, removeActiveNewProduct, startNewProduct } from '../../actions/Product'

export const ProductRegister = ({ typeRegister = 0 }) => {

    const dispatch = useDispatch()
    const { activeNew, modalNew } = useSelector(state => state.product)

    const closeModal = () => {
        dispatch(removeActiveNewProduct())
        dispatch(closeModalNewProduct())
    }

    return (
        <>
            <button
                onClick={() => dispatch(startNewProduct())}
                className="btn btn-primary"
            >
                Crear Usuario
            </button>
            <Modal
                size='lg'
                show={modalNew}
                onHide={closeModal}
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>Inicio de sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        Object.keys(activeNew).length === 0 && 
                        <>Hola</>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
