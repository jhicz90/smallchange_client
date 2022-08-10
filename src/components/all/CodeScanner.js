import React, { useEffect } from 'react'
import { useHtml5QrCodeScanner } from 'react-html5-qrcode-reader'

export const CodeScanner = ({ fps = 10, width = 250, height = 250, disableFlip = false }) => {

    const { Html5QrcodeScanner } = useHtml5QrCodeScanner('https://unpkg.com/html5-qrcode@2.2.1/html5-qrcode.min.js')

    useEffect(() => {
        if (Html5QrcodeScanner) {
            let html5QrcodeScanner = new Html5QrcodeScanner('reader', { fps, qrbox: { width, height }, disableFlip }, false)

            html5QrcodeScanner.render(
                (data) => console.log('success ->', data),
                (err) => console.log('err ->', err)
            )
        }
    }, [Html5QrcodeScanner, fps, width, height, disableFlip])

    return (
        <div id='reader' />
    )
}
