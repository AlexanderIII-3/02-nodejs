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
    <p>Nếu bạn nhận được email này sau khi bạn đặt lịch hẹn với bác sĩ! Trên trang đặt lịch BookingCare của chúng tôi  </p>
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
        attachments: [
            {
                filename: 'KetQuaKham.pdf',
                content: dataSend.pdf,
                encoding: 'base64'
            }
        ],
    });
};
let getBodyHTMLEmailRemedy = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
            <h2 style="color: #2d8cf0;">Kính gửi ${data.patientName},</h2>
            <p>
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.<br>
                Đây là kết quả khám bệnh của bạn tại cơ sở y tế:
            </p>
            <ul>
                <li><strong>Họ tên bệnh nhân:</strong> ${data.patientName}</li>
                <li><strong>Email:</strong> ${data.email || ''}</li>
                <li><strong>Ngày khám:</strong> ${data.date || ''}</li>
                <li><strong>Bác sĩ phụ trách:</strong> ${data.doctorName || ''}</li>
            </ul>
            <p>
                <strong>Kết quả khám và đơn thuốc:</strong> đã được gửi kèm trong file đính kèm email này.<br>
                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>
            <p style="margin-top: 32px;">
                Trân trọng,<br>
                <b>Phòng khám BookingCare</b>
            </p>
            <hr>
            <div style="font-size: 13px; color: #888;">
                Đây là email tự động, vui lòng không trả lời email này.
            </div>
        </div>
    `;
}



module.exports = {
    sendSimpleEmail, sendEmail
}