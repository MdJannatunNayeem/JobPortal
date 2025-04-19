import nodemailer from 'nodemailer'
import {EMAIL_HOST,EMAIL_PORT, EMAIL_PASSWORD,EMAIL_USER,MAIL_ENCRYPTION} from '../config/config.js'

const EmailSend=async (EmailTo,EmailText,EmailSubject)=>{

    let  transport= nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure:false,
        auth:{user:"mdjannatunnayeem99@gmail.com",pass:"xybesnvagufgqtvc"},
        tls:{rejectUnauthorized:false}
    })


    let mailOption={
        from:'JOB PORTAL MEDIA <mdjannatunnayeem99@gmail.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }

    return await transport.sendMail(mailOption)
}

export default EmailSend