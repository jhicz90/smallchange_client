import React, { useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeScanCode } from '../../actions/UI'

const brConfig = { fps: 10, qrbox: { width: 400, height: 200 } }
let html5QrCode

export const CodeScanner = (props) => {

    const dispatch = useDispatch()
    const { modalScanCode } = useSelector(state => state.ui)

    return (
        <Modal
            show={modalScanCode}
            onHide={() => dispatch(closeScanCode())}
            centered
        >
            <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: '#000' }}>
                <Modal.Title>Escanear código</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ position: "relative" }}>
                <Scanner props={props} />
            </Modal.Body>
        </Modal>
    )
}


const Scanner = (props) => {
    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then((res) => {
                    html5QrCode.clear()
                })
                .catch((err) => {
                    console.log(err.message)
                })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        html5QrCode = new Html5Qrcode('reader-code')

        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            props.onResult(decodedText)
            handleStop()
        }

        html5QrCode.start(
            { facingMode: "environment" },
            brConfig,
            qrCodeSuccessCallback
        )

        return () => { html5QrCode = null }
    }, [props])

    return (
        <>
            <div id="reader-code" width="100%" />
            <button onClick={() => handleStop()}>stop pro</button>
        </>
    )
}