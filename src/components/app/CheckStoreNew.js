import React from 'react'
import { Alert, Button, Modal, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { startCreateStore } from '../../actions/Store'

export const CheckStoreNew = () => {

    const dispatch = useDispatch()
    const { stores } = useSelector(state => state.auth)
    const { register, handleSubmit } = useForm()

    const handleRegister = (data) => {
        const { name, rucid, email, address, desc } = data
        dispatch(startCreateStore({ name, rucid, email, address, desc }))
    }
    
    return (
        <>
            {
                stores.length === 0
                &&
                <Modal show size={'lg'}>
                    <Modal.Header>
                        🎉🎉Mi primera BODEGA🎉🎉
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant='warning'>Para seguir usando la aplicación es necesario registrar tu primera tienda o bódega</Alert>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='name'
                                        label='Nombres'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingresa el nombre de la tienda'
                                            autoComplete='off'
                                            autoFocus
                                            {...register('name', { required: 'Ingresa el nombre de la tienda' })}
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='rucid'
                                        label='Código de identidad o RUC'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingrese un código de identidad o RUC para la tienda'
                                            autoComplete='off'
                                            {...register('rucid', { required: 'Ingrese un código de identidad o RUC para la tienda' })}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FloatingLabel
                                        controlId='email'
                                        label='Correo (Opcional)'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingresa el correo de la tienda'
                                            autoComplete='off'
                                            autoFocus
                                            {...register('email')}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FloatingLabel
                                        controlId='address'
                                        label='Dirección o domicilio (Opcional)'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            as={'textarea'}
                                            style={{ minHeight: '100px' }}
                                            placeholder='Ingresa dirección'
                                            autoComplete='off'
                                            autoFocus
                                            {...register('address')}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <FloatingLabel
                                        controlId='desc'
                                        label='Descripción (Opcional)'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            as={'textarea'}
                                            style={{ minHeight: '100px' }}
                                            placeholder='Ingresa alguna descripción de la tienda'
                                            autoComplete='off'
                                            autoFocus
                                            {...register('desc')}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <Button style={{ width: '100%' }} size='lg' type='submit' variant='primary'>
                                Registrar tienda
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}
