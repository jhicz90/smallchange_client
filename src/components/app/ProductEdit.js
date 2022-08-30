import React, { useEffect } from 'react'
import { Button, ButtonGroup, FloatingLabel, Form, InputGroup, ListGroup, Modal } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import { BsUpcScan } from 'react-icons/bs'
import { AiFillSave, AiOutlinePlus } from 'react-icons/ai'
import { IoRemove } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editActiveProduct, removeActiveProduct, startGetProduct, startUpdateActiveProduct } from '../../actions/Product'
import { openModalScanCode, setCodeModal } from '../../actions/UI'
import { LoadingPage } from '../all/LoadingPage'

export const ProductEdit = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { active } = useSelector(state => state.product)
    const { name, code, desc, price, measure, category, specialPrices } = active
    const { register, setValue, getValues, control, handleSubmit, reset } = useForm({
        defaultValues: {
            name,
            code,
            desc,
            price,
            measure,
            category,
            specialPrices
        }
    })
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: 'specialPrices'
    })

    const handleUpdate = (data) => {
        dispatch(editActiveProduct({ ...data }))
        dispatch(startUpdateActiveProduct())
    }

    const handleScanCode = () => {
        dispatch(setCodeModal((code) => setValue('code', code)))
        dispatch(openModalScanCode())
    }

    useEffect(() => {
        if (id && id !== '') dispatch(startGetProduct(id))
        return () => dispatch(removeActiveProduct())
    }, [id, dispatch])

    useEffect(() => {
        reset({
            name,
            code,
            desc,
            price,
            measure,
            category,
            specialPrices
        })
    }, [reset, name, code, desc, price, measure, category, specialPrices])

    console.log(fields)
    return (
        <Modal
            size='lg'
            show={true}
            onHide={() => navigate(-1)}
            backdrop='static'
        >
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Producto<br />{active.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    Object.keys(active).length === 0 ? <LoadingPage /> :
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Form.Group className='mb-3' controlId='pName'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control {...register('name', { required: true })} type={'text'} autoFocus autoComplete='off' />
                                    </Form.Group>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Group className='mb-3' controlId='pCode'>
                                        <Form.Label>Código</Form.Label>
                                        <InputGroup>
                                            <Form.Control {...register('code')} type={'text'} autoComplete='off' />
                                            <Button
                                                onClick={handleScanCode}
                                                variant='dark'
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <BsUpcScan size={20} />
                                            </Button>
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
                                        <Form.Control as={'textarea'} {...register('desc')} type={'text'} rows={3} />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Group className='mb-3' controlId='pCategory'>
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control {...register('category', { required: true })} type={'text'} autoComplete='off' />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Form.Group className='mb-3' controlId='pPrice'>
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control {...register('price', { required: true, min: 0 })} type={'number'} step={0.01} min={0.01} autoComplete='off' />
                                    </Form.Group>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Group className='mb-3' controlId='pMeasure'>
                                        <Form.Label>Tipo de medida</Form.Label>
                                        <Form.Select {...register('measure', { required: true })} autoComplete='off'>
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
                                <div className="col-12">
                                    <Button
                                        onClick={() => {
                                            append({
                                                name: `${getValues().name} precio especial`,
                                                price: getValues().price,
                                                quantity: 1
                                            });
                                        }}
                                        variant='primary'
                                        className='w-100 mb-1'
                                    >
                                        <AiOutlinePlus size={20} className='me-1' />
                                        Agregue un nuevo precio especial
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
                                ACTUALIZAR
                            </Button>
                        </form>
                }
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
    );
}