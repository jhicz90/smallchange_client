import React, { useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const brConfig = { fps: 10, qrbox: { width: 400, height: 200 } }
let html5QrCode

export const CodeScanner = (props) => {

    useEffect(() => {
        html5QrCode = new Html5Qrcode('reader')

        return () => { html5QrCode = null }
    }, [])

    const handleClickAdvanced = () => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            props.onResult(decodedText)
            handleStop()
        }

        html5QrCode.start(
            { facingMode: "environment" },
            brConfig,
            qrCodeSuccessCallback
        )
    }

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

    return (
        <div style={{ position: "relative" }}>
            <div id="reader" width="100%" />
            <button onClick={() => handleClickAdvanced()}>
                click pro
            </button>
            <button onClick={() => handleStop()}>stop pro</button>
        </div>
    )
}
