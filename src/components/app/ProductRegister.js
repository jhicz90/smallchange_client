import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { BsUpcScan } from 'react-icons/bs'
import { closeModalNewProduct, editActiveNewProduct, removeActiveNewProduct, startSaveNewProduct } from '../../actions/Product'
import { openModalScanCode, setCodeModal } from '../../actions/UI'

export const ProductRegister = () => {

    const dispatch = useDispatch()
    const { stores } = useSelector(state => state.auth)
    const { modalNew } = useSelector(state => state.product)
    const { register, control, setValue, handleSubmit, reset } = useForm()
    const [nextProduct, setNextProduct] = useState(true)

    const closeModal = () => {
        dispatch(removeActiveNewProduct())
        dispatch(closeModalNewProduct())
    }

    const handleRegister = (data) => {
        dispatch(editActiveNewProduct({ ...data, store: data.store._id || '' }))
        dispatch(startSaveNewProduct({ next: nextProduct }))
        if (nextProduct) reset({
            name: '',
            code: '',
            desc: '',
            price: 1,
            measure: 1,
            store: stores[0] || null,
            category: ''
        })
    }

    const handleScanCode = () => {
        dispatch(setCodeModal((code) => setValue('code', code)))
        dispatch(openModalScanCode())
    }

    useEffect(() => {
        reset({
            name: '',
            code: '',
            desc: '',
            price: 1,
            measure: 1,
            store: stores[0] || null,
            category: ''
        })
    }, [stores, reset, modalNew])

    useEffect(() => {
        setNextProduct(false)
    }, [modalNew])

    return (
        <Modal
            size='lg'
            show={modalNew}
            onHide={closeModal}
            backdrop='static'
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Ingresar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Check
                    type="switch"
                    id="next-switch"
                    label="Registar y pasar al siguiente?"
                    value={nextProduct}
                    onChange={e => setNextProduct(e.target.value)}
                />
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pName'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    {...register('name', { required: true })}
                                    type={'text'}
                                    autoFocus
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pCode'>
                                <Form.Label>Código</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        {...register('code')}
                                        type={'text'}
                                        autoComplete='off'
                                    />
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Escanea un codigo QR o de BARRAS
                                            </Tooltip>}
                                    >
                                        <Button
                                            onClick={handleScanCode}
                                            variant='dark'
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <BsUpcScan size={20} />
                                        </Button>
                                    </OverlayTrigger>

                                </InputGroup>
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
                                <Form.Control
                                    {...register('desc')}
                                    as={'textarea'}
                                    type={'text'}
                                    rows={3}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pPrice'>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    {...register('price', { required: true, min: 0 })}
                                    type={'number'}
                                    step={0.01}
                                    min={0.01}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pMeasure'>
                                <Form.Label>Tipo de medida</Form.Label>
                                <Form.Select
                                    {...register('measure', { required: true })}
                                    autoComplete='off'
                                >
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
                            <Form.Group className='mb-3' controlId='pStore'>
                                <Form.Label>Tienda</Form.Label>
                                <Controller
                                    name="store"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Select
                                        {...field}
                                        options={stores}
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e._id}
                                        placeholder='Seleccione la tienda'
                                    />}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pCategory'>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    {...register('category', { required: true })}
                                    type={'text'}
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Button type='submit' style={{ width: '100%' }} variant='success'>
                        INGRESAR
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}
