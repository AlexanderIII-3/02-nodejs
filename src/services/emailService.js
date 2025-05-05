// import 'dotenv/config'
const dotenv = require('dotenv');
dotenv.config();
import nodemailer from "nodemailer"
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Alex Xander 👻" <duachutthoid@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông Tin Đặt Lịch Khám bệnh ✔", // Subject line
        text: "Konichiwa?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });

};
let getBodyHTMLEmail = (dataSend) => {
    let link = dataSend.redirecLink;
    let result = '';

    result = `
    <h3>Xin Chào  ${dataSend.patientName}!</h3>
    <p>Nếu bạn nhận được email này sau khi bạn đặt lịch hẹn với bác sĩ! Trên trang web AlexSanDer đẹp trai  </p>
    <p>Thông Tin:</p>
    <div><b>Thời Gian: ${dataSend.time}</b></div>
     Nếu những thông tin này chính xác, vui lòng xác nhận và hoàn tất cuộc hẹn khám bệnh của bạn với bác sĩ.</p>
    <div>
    <a href=${link} target="_blank"  >Nhấp vào đây để xác nhận</a>

    </div>
    <div>Xin Chân Thành Cảm Ơn!</div>
    
    `

    return result;
};






// Hàm gửi email

let sendEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Bookingcare 👻" <thanhkun267@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết Quả  Lịch Khám bệnh ✔", // Subject line
        text: "Konichiwa?", // plain text body
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        // attach image
        attachments: [
            {
                filename: 'KetQuaKham.pdf',
                content: dataSend.pdf,
                encoding: 'base64'
            }
        ], // attachments
    });
};
let getBodyHTMLEmailRemedy = (data) => {
    let result = '';

    result = `
    <h3>Xin Chào  ${data.patientName} !</h3>
    <p>Nếu bạn nhận được email này sau khi bạn đặt lịch hẹn với bác sĩ! Trên trang web AlexSanDer đẹp trai  </p>
    <p>Thông tin đơn thuốc đã được gửi trong file đính kèm</p>
   
    <div>Xin Chân Thành Cảm Ơn!</div>
    
    `

    return result;
}



module.exports = {
    sendSimpleEmail, sendEmail
}