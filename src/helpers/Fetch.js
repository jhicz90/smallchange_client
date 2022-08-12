import axios from 'axios'
import { baseURL } from '../types/Url'
import { MessageAlert } from './ManagerMsg'

export const fetchNoToken = async ({ endpoint = '', data = {}, params = {}, method = 'GET', notify = true }) => {
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

            if (bodyResponse.msg !== undefined && notify) {
                bodyResponse.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }

            return { ...bodyResponse }
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

            if (bodyResponse.msg !== undefined && notify) {
                bodyResponse.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }

            return { ...bodyResponse }
        }
    } catch (err) {
        console.log(err)

        if (notify) {
            const { data } = err.response
            if (data.hasOwnProperty('msg')) {
                data.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }
        }

        const errorFetch = { ok: false }
        return errorFetch
    }
}

export const fetchByToken = async ({ endpoint = '', data = {}, params = {}, method = 'GET', notify = true }) => {
    const token = localStorage.getItem('token') || ''

    try {
        if (method === 'GET') {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                url: endpoint,
                params
            })

            const bodyResponse = resp.data

            if (bodyResponse.msg !== undefined && notify) {
                bodyResponse.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }

            return { ...bodyResponse }
        } else {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`
                },
                url: endpoint,
                data
            })

            const bodyResponse = resp.data

            if (bodyResponse.msg !== undefined && notify) {
                bodyResponse.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }

            return { ...bodyResponse }
        }
    } catch (err) {
        console.log(err)

        if (notify) {
            const { data } = err.response
            if (data.hasOwnProperty('msg')) {
                data.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
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
                'Authorization': `${token}`
            },
            url: endpoint,
            data
        })

        const bodyResponse = resp.data

        if (bodyResponse.msg !== undefined && notify) {
            bodyResponse.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
        }

        return { ...bodyResponse }
    } catch (err) {
        console.log(err)

        if (notify) {
            const { data } = err.response
            if (data.hasOwnProperty('msg')) {
                data.msg.forEach(({ type, content, delay }) => MessageAlert({ type, content, delay }))
            }
        }

        const errorFetch = { ok: false }

        return errorFetch
    }
}