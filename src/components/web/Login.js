import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { startLogin } from '../../actions/Auth'
import { CardSub } from '../../helpers/Styles'

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, handleSubmit } = useForm();

    const handleLogin = (data) => {
        const { email, password } = data
        dispatch(startLogin({ email, password }))
    }

    return (
        <Modal show={true} onHide={() => navigate('/web')}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Inicio de sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`/assets/logo.png`} className='rounded mx-auto d-block mb-3' alt={'logo'} width={96} height={96} />
                <CardSub>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <FloatingLabel
                                controlId='email'
                                label='Correo'
                                className='mb-3'
                            >
                                <Form.Control
                                    type='email'
                                    placeholder='nombre@ejemplo.com'
                                    autoComplete='off'
                                    autoFocus
                                    {...register('email', { required: true })}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId='password'
                                label='Contraseña'
                                className='mb-3'
                            >
                                <Form.Control
                                    type='password'
                                    placeholder='******'
                                    autoComplete='off'
                                    {...register('password', { required: true })}
                                />
                            </FloatingLabel>
                            <Button style={{ width: '100%' }} type='submit' variant='success'>
                                INGRESAR
                            </Button>
                        </form>
                    </div>
                </CardSub>
                <Card className='mt-3'>
                    <div className='card-body'>
                        ¿Nuevo en SmallChange? <Link to={`/web/register`} state={state}>Crea una cuenta</Link>.
                    </div>
                </Card>
            </Modal.Body>
        </Modal >
    )
}
