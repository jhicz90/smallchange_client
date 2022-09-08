import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, FloatingLabel, Form, InputGroup, ListGroup, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import AsyncCreatable from 'react-select/async-creatable'
import { BsUpcScan } from 'react-icons/bs'
import { AiFillSave, AiOutlinePlus } from 'react-icons/ai'
import { IoRemove } from 'react-icons/io5'
import { closeModalNewProduct, editActiveNewProduct, removeActiveNewProduct, startSaveNewProduct } from '../../actions/Product'
import { openModalScanCode, setCodeModal } from '../../actions/UI'
import { newCategory, searchCategory } from '../../actions/Category'
import { newBrand, searchBrand } from '../../actions/Brand'

export const ProductRegister = () => {

    const dispatch = useDispatch()
    const { activeNew, modalNew } = useSelector(state => state.product)
    const { register, control, setValue, handleSubmit, reset } = useForm()
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: 'specialPrices'
    })

    const [nextProduct, setNextProduct] = useState(true)
    const [loadingNewCategory, setLoadingNewCategory] = useState(false)
    const [loadingNewBrand, setLoadingNewBrand] = useState(false)

    const closeModal = () => {
        dispatch(removeActiveNewProduct())
        dispatch(closeModalNewProduct())
    }

    const handleRegister = (data) => {
        dispatch(editActiveNewProduct({ ...data, store: data.store._id || '' }))
        dispatch(startSaveNewProduct({ next: nextProduct }))
    }

    const handleScanCode = () => {
        dispatch(setCodeModal((code) => setValue('code', code)))
        dispatch(openModalScanCode())
    }

    useEffect(() => {
        setNextProduct(false)
        reset({ ...activeNew, store: activeNew.hasOwnProperty('stores') ? activeNew.stores[0] : null })
    }, [reset, activeNew])

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
                                    rows={2}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Group className='mb-3' controlId='pType'>
                                <Form.Label className='me-2'>Tipo de producto</Form.Label>
                                <Form.Check
                                    {...register('type', { required: true })}
                                    inline
                                    id='type-1'
                                    value={1}
                                    label='No perecedero'
                                    type='radio'
                                />
                                <Form.Check
                                    {...register('type', { required: true })}
                                    inline
                                    id='type-2'
                                    value={2}
                                    label='Semi-perecedero'
                                    type='radio'
                                />
                                <Form.Check
                                    {...register('type', { required: true })}
                                    inline
                                    id='type-3'
                                    value={3}
                                    label='Perecedero'
                                    type='radio'
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pBrand'>
                                <Form.Label>Marca</Form.Label>
                                <Controller
                                    name='brand'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncCreatable
                                                {...field}
                                                isClearable
                                                defaultOptions
                                                isDisabled={loadingNewBrand}
                                                isLoading={loadingNewBrand}
                                                loadOptions={async e => {
                                                    const fetchData = await searchBrand(e)
                                                    return fetchData.map(d => ({ value: d._id, label: d.name }))
                                                }}
                                                menuPlacement={'auto'}
                                                onCreateOption={async e => {
                                                    setLoadingNewBrand(true)
                                                    const { _id, name } = await newBrand(e)
                                                    setValue('brand', { value: _id, label: name })
                                                    setLoadingNewBrand(false)
                                                }}
                                                placeholder={`Busque la marca...`}
                                                loadingMessage={({ inputValue }) => `Buscando "${inputValue}"`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con "${inputValue}"`}
                                                formatCreateLabel={e => `Crear marca: "${e.toUpperCase()}"`}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pCriticalStock'>
                                <Form.Label>Stock crítico</Form.Label>
                                <Form.Control
                                    {...register('criticalStock', { required: true, min: 1 })}
                                    type={'number'}
                                    autoComplete='off'
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
                                    render={
                                        ({ field }) =>
                                            <Select
                                                {...field}
                                                isClearable
                                                options={activeNew.stores}
                                                getOptionLabel={e => e.name}
                                                getOptionValue={e => e._id}
                                                menuPlacement={'auto'}
                                                placeholder={`Seleccione la tienda`}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-6">
                            <Form.Group className='mb-3' controlId='pCategory'>
                                <Form.Label>Categoria</Form.Label>
                                <Controller
                                    name='category'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncCreatable
                                                {...field}
                                                isClearable
                                                defaultOptions
                                                isDisabled={loadingNewCategory}
                                                isLoading={loadingNewCategory}
                                                loadOptions={async e => {
                                                    const fetchData = await searchCategory(e)
                                                    return fetchData.map(d => ({ value: d._id, label: d.name }))
                                                }}
                                                menuPlacement={'auto'}
                                                onCreateOption={async e => {
                                                    setLoadingNewCategory(true)
                                                    const { _id, name } = await newCategory(e)
                                                    setValue('category', { value: _id, label: name })
                                                    setLoadingNewCategory(false)
                                                }}
                                                placeholder={`Busque la categoria...`}
                                                loadingMessage={({ inputValue }) => `Buscando "${inputValue}"`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con "${inputValue}"`}
                                                formatCreateLabel={e => `Crear categoria: "${e.toUpperCase()}"`}
                                            />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Button
                                onClick={() => {
                                    append({
                                        name: `Precio especial`,
                                        price: 1,
                                        quantity: 1
                                    });
                                }}
                                variant='primary'
                                className='w-100 mb-1'
                            >
                                <AiOutlinePlus size={20} className='me-1' />
                                Agregue un precio especial
                            </Button>
                            <ListGroup className='mb-3'>
                                {
                                    fields.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={item.id}>
                                                <EditPriceSpecial
                                                    update={update}
                                                    index={index}
                                                    value={item}
                                                    remove={() => remove(index)}
                                                />
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
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

const EditPriceSpecial = ({ update, index, value, remove }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: value
    })

    return (
        <div className='hstack gap-3' onSubmit={handleSubmit((data) => {
            update(index, data)
        })}>
            <div className="row">
                <div className="col-12">
                    <FloatingLabel
                        label='Nombre precio especial'
                        className='mb-2'
                    >
                        <Form.Control
                            type='text'
                            placeholder='Nombre precio especial'
                            autoComplete='off'
                            autoFocus
                            {...register('name', { required: true, minLength: 4 })}
                        />
                    </FloatingLabel>
                </div>
                <div className="col-6">
                    <FloatingLabel
                        label='Precio especial'
                    >
                        <Form.Control
                            type='number'
                            placeholder='Precio especial'
                            autoComplete='off'
                            {...register('price', { required: true, min: 0.01 })}
                        />
                    </FloatingLabel>
                </div>
                <div className="col-6">
                    <FloatingLabel
                        label='Cantidad'
                    >
                        <Form.Control
                            type='number'
                            placeholder='Cantidad'
                            autoComplete='off'
                            {...register('quantity', { required: true, min: 1 })}
                        />
                    </FloatingLabel>
                </div>
            </div>
            <ButtonGroup size='sm'>
                <Button
                    variant='primary'
                    type='submit'
                    onClick={handleSubmit((data) => {
                        update(index, data)
                    })}
                >
                    <AiFillSave size={20} />
                </Button>

                <Button
                    variant='danger'
                    onClick={remove}
                >
                    <IoRemove size={20} />
                </Button>
            </ButtonGroup>
        </div>
    )
}