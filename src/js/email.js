import {emailConfig} from './config/emailConfig'

const emailHost = emailConfig.EMAIL_HOST
const emailApi = '/api/v1/support'
export async function sendMail(data) {
    return await fetch(`${emailHost}${emailApi}`, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
    })
}

