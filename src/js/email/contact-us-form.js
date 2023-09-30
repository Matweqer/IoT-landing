import { sendMail } from '../email';

export const sendEmailFromContactUs = async (data) => {
    await sendMail(data)
}
