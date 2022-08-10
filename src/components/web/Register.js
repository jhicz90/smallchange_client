import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { startRegister } from '../../actions/Auth'
import { CardSub } from '../../helpers/Styles'

export const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const { register, getValues, handleSubmit } = useForm()

    const handleRegister = (data) => {
        const { email, password, passwordConfirm } = data
        dispatch(startRegister({ email, password, passwordConfirm }))
    }

    return (
        <Modal show={true} onHide={() => navigate('/web')}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`/assets/logo.png`} className='rounded mx-auto d-block mb-3' alt={'logo'} width={96} height={96} />
                <CardSub>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(handleRegister)}>
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
                            <FloatingLabel
                                controlId='passwordConfirm'
                                label='Confirme contraseña'
                                className='mb-3'
                            >
                                <Form.Control
                                    type='password'
                                    placeholder='******'
                                    autoComplete='off'
                                    {...register('passwordConfirm', {
                                        required: true,
                                        validate: {
                                            matchesPreviousPassword: (value) => {
                                                const { password } = getValues();
                                                return password === value || "Las contraseñas no coinciden!";
                                            }
                                        }
                                    })}
                                />
                            </FloatingLabel>
                            <Button style={{ width: '100%' }} size='lg' type='submit' variant='primary'>
                                REGISTRAR
                                <img className='ms-1' src={'/assets/easy.png'} alt='join' width={24} height={24} />
                            </Button>
                        </form>
                    </div>
                </CardSub>
                <Card className='mt-3'>
                    <div className='card-body'>
                        ¿Si ya tienes una cuenta en SmallChange? <Link to={`/web/login`} state={state}>Inicie sesión</Link>.
                    </div>
                </Card>
            </Modal.Body>
        </Modal>
    )
}
