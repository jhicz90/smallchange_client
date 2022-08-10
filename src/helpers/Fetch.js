import axios from 'axios'
import { baseURL } from '../types/Url'
import { MessageAlert } from './ManagerMsg'

export const fetchNoToken = async ({ endpoint = '', data = {}, params = {}, method = 'GET', notify = true, messageOk = '', messageError = '' }) => {
    try {
        if (method === 'GET') {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json'
                },
                url: endpoint,
                params
            })

            const bodyResponse = resp.data

            if (resp.status === 200 && notify) {
                if (messageOk === '') {
                    MessageAlert({ type: 1, msg: resp.statusText })
                } else {
                    MessageAlert({ type: 1, msg: messageOk })
                }
            }

            return { ok: true, data: bodyResponse }
        } else {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json'
                },
                url: endpoint,
                data
            })

            const bodyResponse = resp.data

            if (resp.status === 200 && notify) {
                if (messageOk === '') {
                    MessageAlert({ type: 1, msg: resp.statusText })
                } else {
                    MessageAlert({ type: 1, msg: messageOk })
                }
            }

            return { ok: true, data: bodyResponse }
        }
    } catch (err) {
        console.log(err)

        if (notify) {
            if (err.response.data === undefined) {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.message })
            } else {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.response.data.message })
            }
        }

        const errorFetch = { ok: false }
        return errorFetch
    }
}

export const fetchByToken = async ({ endpoint = '', data = {}, params = {}, method = 'GET', notify = true, messageOk = '', messageError = '' }) => {
    const token = localStorage.getItem('token') || ''

    try {
        if (method === 'GET') {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `User ${token}`
                },
                url: endpoint,
                params
            })

            const bodyResponse = resp.data

            if (resp.status === 200 && notify) {
                if (messageOk === '') {
                    MessageAlert({ type: 1, msg: resp.statusText })
                } else {
                    MessageAlert({ type: 1, msg: messageOk })
                }
            }

            return { ok: true, data: bodyResponse }
        } else {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `User ${token}`
                },
                url: endpoint,
                data
            })

            const bodyResponse = resp.data

            if (resp.status === 200 && notify) {
                if (messageOk === '') {
                    MessageAlert({ type: 1, msg: resp.statusText })
                } else {
                    MessageAlert({ type: 1, msg: messageOk })
                }
            }

            return { ok: true, data: bodyResponse }
        }
    } catch (err) {
        console.log(err)

        if (notify) {
            if (err.response.data === undefined) {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.message })
            } else {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.response.data.message })
            }
        }

        const errorFetch = { ok: false }

        return errorFetch
    }
}

export const fetchUpFilesByToken = async ({ endpoint = '', data = {}, method = 'GET', notify = false, messageOk = '', messageError = '' }) => {
    const token = localStorage.getItem('token') || ''

    try {
        const resp = await axios({
            method,
            baseURL,
            headers: {
                'Authorization': `User ${token}`
            },
            url: endpoint,
            data
        })

        const bodyResponse = resp.data

        if (resp.status === 200 && notify) {
            if (messageOk === '') {
                MessageAlert({ type: 1, msg: resp.statusText })
            } else {
                MessageAlert({ type: 1, msg: messageOk })
            }
        }

        return { ok: true, data: bodyResponse }
    } catch (err) {
        console.log(err)

        if (notify) {
            if (err.response.data === undefined) {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.message })
            } else {
                MessageAlert({ type: 2, msg: messageError !== '' ? messageError : err.response.data.message })
            }
        }

        const errorFetch = { ok: false }

        return errorFetch
    }
}