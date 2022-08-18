import React, { useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalScanCode, finishScanCode } from '../../actions/UI'

let html5QrCode

export const CodeScanner = () => {

    const dispatch = useDispatch()
    const { modalScanCode } = useSelector(state => state.ui)

    return (
        <Modal
            show={modalScanCode}
            onHide={() => dispatch(closeModalScanCode())}
            centered
        >
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: '#000' }}>
                <Modal.Title>Escanear código</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ position: "relative" }}>
                {
                    modalScanCode
                    &&
                    <Scanner />
                }
            </Modal.Body>
        </Modal>
    )
}


const Scanner = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        html5QrCode = new Html5Qrcode('reader-code')

        const handleStop = () => {
            try {
                html5QrCode
                    .stop()
                    .then((res) => {
                        html5QrCode.clear()
                    })
                    .catch((err) => {
                        dispatch(finishScanCode('Cancelar'))
                        console.log(err.message)
                    })
            } catch (err) {
                console.log(err)
            }
        }

        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 400, height: 200 } },
            (decodedText, decodedResult) => {
                handleStop()
                dispatch(finishScanCode(decodedText))
            }
        )

        return () => {
            handleStop()
            html5QrCode = null
        }
    }, [dispatch])

    return (
        <div id="reader-code" width="100%" />
    )
}