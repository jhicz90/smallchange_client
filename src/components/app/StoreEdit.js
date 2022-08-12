import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const StoreEdit = () => {

    const navigate = useNavigate()

    return (
        <Modal show={true} onHide={() => navigate(-1)}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Nombre de la tienda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Datos de la tienda
            </Modal.Body>
        </Modal>
    )
}
