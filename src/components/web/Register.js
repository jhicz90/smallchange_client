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
        const { names, surnames, gender, docid, username, email, password, passwordConfirm } = data
        dispatch(startRegister({ names, surnames, gender, docid, username, email, password, passwordConfirm }))
    }

    return (
        <Modal show={true} size={'lg'} onHide={() => navigate('/web')}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`/assets/logo.png`} className='rounded mx-auto d-block mb-3' alt={'logo'} width={96} height={96} />
                <CardSub>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='names'
                                        label='Nombres'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Dejanos tu nombre'
                                            autoComplete='off'
                                            autoFocus
                                            {...register('names', { required: true })}
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='surnames'
                                        label='Apellidos'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Tambien tus apellidos'
                                            autoComplete='off'
                                            {...register('surnames', { required: true })}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='gender'
                                        label='Género'
                                        className='mb-3'
                                    >
                                        <Form.Select
                                            type='text'
                                            placeholder='Indica tu género'
                                            autoComplete='off'
                                            {...register('gender', { required: true })}
                                        >
                                            <option value={'F'}>Mujer</option>
                                            <option value={'M'}>Hombre</option>
                                            <option value={'O'}>Otro</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='docid'
                                        label='Documento de identidad'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='Tu documento es necesario'
                                            autoComplete='off'
                                            {...register('docid', { required: true })}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='username'
                                        label='Nombre de usuario'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            placeholder='nombredeinicio'
                                            autoComplete='off'
                                            {...register('username', { required: true })}
                                        />
                                    </FloatingLabel>
                                </div>
                                <div className="col-12 col-md-6">
                                    <FloatingLabel
                                        controlId='email'
                                        label='Correo'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='email'
                                            placeholder='nombre@ejemplo.com'
                                            autoComplete='off'
                                            {...register('email', { required: true })}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
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
                                </div>
                                <div className="col-12 col-md-6">
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
                                                        const { password } = getValues()
                                                        return password === value || 'Las contraseñas no coinciden!'
                                                    }
                                                }
                                            })}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
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
