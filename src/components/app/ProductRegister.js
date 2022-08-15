import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal, Nav, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AiOutlineFileAdd, AiOutlineSearch } from 'react-icons/ai'
import AsyncSelect from 'react-select/async'
import { closeModalNewProduct, editActiveNewProduct, findProduct, openModalNewProduct, removeActiveNewProduct, startNewProduct, startSaveNewProduct } from '../../actions/Product'

export const ProductFindAndRegister = () => {

    const dispatch = useDispatch()
    const { modalNew } = useSelector(state => state.product)

    const closeModal = () => {
        dispatch(removeActiveNewProduct())
        dispatch(closeModalNewProduct())
    }

    return (
        <>
            <button
                onClick={() => dispatch(openModalNewProduct())}
                className="btn btn-light"
            >
                Ingresar producto
            </button>
            <Modal
                size='lg'
                show={modalNew}
                onHide={closeModal}
                backdrop='static'
            >
                <Tab.Container defaultActiveKey={'#search'}>
                    <Modal.Header closeButton closeVariant='white'>
                        {/* Hola
                        <Modal.Title>Inicio de sesión</Modal.Title> */}
                        <Nav className="flex-column flex-md-row gap-2" variant='pills'>
                            <Nav.Item>
                                <Nav.Link style={{ cursor: 'pointer' }} eventKey="#search">
                                    <AiOutlineSearch size={20} className='me-1' />
                                    Buscar producto
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={{ cursor: 'pointer' }} eventKey="#register">
                                    <AiOutlineFileAdd size={20} className='me-1' />
                                    Registrar nuevo producto
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="#search">
                                <SearchProduct />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#register">
                                <RegisterProduct />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    )
}


const SearchProduct = () => {

    const [fProduct, setFProduct] = useState('')

    return (
        <>
            <Alert variant='info'>
                Aqui puedes seleccionar tu producto/servicio
            </Alert>
            <AsyncSelect
                cacheOptions
                defaultOptions
                isClearable
                inputId="occup"
                value={fProduct}
                // getOptionLabel={e =>
                //     <OptionImage option={e} />
                // }
                getOptionValue={e => e._id}
                loadOptions={findProduct}
                onChange={(e) => setFProduct(e)}
                menuPlacement={'auto'}
                autoFocus
                placeholder='Por favor ingrese uno o más caracteres para la busqueda'
                loadingMessage={() => 'Buscando...'}
                noOptionsMessage={() => 'Sin resultados'}
            />
        </>
    )
}

const RegisterProduct = () => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.product)
    const { register, handleSubmit } = useForm()

    console.log('ACTIVE NEW ->', activeNew)

    const handleRegister = (data) => {
        // const { name, code, desc, price, measure, category, batch } = data
        dispatch(editActiveNewProduct(data))
        dispatch(startSaveNewProduct())
    }

    useEffect(() => {
        dispatch(startNewProduct())
    }, [dispatch])

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control {...register('name', { required: true })} type={'text'} />
                    </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pCode'>
                        <Form.Label>Código</Form.Label>
                        <Form.Control {...register('code')} type={'text'} />
                        <Form.Text className='text-muted'>
                            Este código podra ser de BARRAS o QR
                        </Form.Text>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Form.Group className='mb-3' controlId='pDesc'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as={'textarea'} {...register('desc')} type={'text'} rows={3} />
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pPrice'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control {...register('price', { required: true, min: 0 })} type={'number'} />
                    </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pMeasure'>
                        <Form.Label>Tipo de medida</Form.Label>
                        <Form.Select {...register('measure', { required: true })} >
                            <option value={1}>Unidad</option>
                            <option value={2}>Kilogramos</option>
                            <option value={3}>Litros</option>
                        </Form.Select>
                        <Form.Text className='text-muted'>
                            Elija el tipo de venta del producto por medida
                        </Form.Text>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pCategory'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control {...register('category', { required: true })} type={'text'} />
                    </Form.Group>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Group className='mb-3' controlId='pBatch'>
                        <Form.Label>Lote</Form.Label>
                        <Form.Control {...register('batch', { required: true })} />
                        <Form.Text className='text-muted'>
                            Elija del lote que proviene esta producto
                        </Form.Text>
                    </Form.Group>
                </div>
            </div>
            <Button style={{ width: '100%' }} type='submit' variant='success'>
                INGRESAR
            </Button>
        </form>
    )
}