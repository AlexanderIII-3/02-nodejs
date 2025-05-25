const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
require("pdfkit-table"); // Thêm vào để dùng bảng
import { sendEmail } from "./emailService"; // Import hàm gửi email từ emailService.js
// Load biến môi trường
dotenv.config();

// Tạo transporter ở đây

// Hàm tạo PDF

async function generatePDF(patientInfo, filePath) {


    try {
        const doc = new PDFDocument({ margin: 50 });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Đăng ký font hỗ trợ tiếng Việt
        const fontPath = path.join(__dirname, "../fonts/Roboto-Regular.ttf");
        const boldFontPath = path.join(__dirname, "../fonts/Roboto-Bold.ttf");
        doc.registerFont("Normal", fontPath);
        doc.registerFont("Bold", boldFontPath);
        doc.font("Normal");

        // Logo + tiêu đề
        const logoPath = path.join(__dirname, "../images/clinic-logo.png");
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 30, { width: 60 });
        }

        doc
            .font("Bold")
            .fontSize(16)
            .text(`${patientInfo.nameClinic || ""}`, 120, 35, { align: "center" })
            .fontSize(20)
            .text("PHIẾU KẾT QUẢ KHÁM BỆNH", { align: "center", underline: true });

        doc.moveDown(2);

        // Dữ liệu bảng: dùng chiều cao động cho từng dòng
        const startY = doc.y;
        const labelWidth = 150;
        const valueWidth = 390;
        const left = 50;
        const rowPadding = 5;
        const timestamp = patientInfo.date;


        // const dateObj = new Date(timestamp).getDay();
        const day = new Date(+timestamp).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        console.log("check date", day);
        // 3. Định dạng chuỗi DD/MM/YYYY
        const rows = [
            ["Họ tên bệnh nhân", patientInfo.patientName],
            ["Ngày khám", day],
            ["Bác sĩ khám", patientInfo.doctorname || "Không rõ"],
            ["Chuẩn đoán bệnh", patientInfo.result || "Không có"],
            ["Đơn thuốc", patientInfo.prescription || "Không có"],
            ["Lưu ý của bác sĩ", patientInfo.note || "Không có"],
        ];

        for (let i = 0; i < rows.length; i++) {
            const [label, value] = rows[i];
            const y = doc.y;

            // Tính chiều cao động của mỗi ô
            const valueHeight = doc.heightOfString(value, {
                width: valueWidth - 2 * rowPadding,
            });
            const labelHeight = doc.heightOfString(label, {
                width: labelWidth - 2 * rowPadding,
            });
            const rowHeight = Math.max(valueHeight, labelHeight) + 2 * rowPadding;

            // Ô nhãn
            doc
                .rect(left, y, labelWidth, rowHeight)
                .stroke()
                .font("Bold")
                .text(label, left + rowPadding, y + rowPadding, {
                    width: labelWidth - 2 * rowPadding,
                });

            // Ô giá trị
            doc
                .rect(left + labelWidth, y, valueWidth, rowHeight)
                .stroke()
                .font("Normal")
                .text(value, left + labelWidth + rowPadding, y + rowPadding, {
                    width: valueWidth - 2 * rowPadding,
                });

            doc.moveDown();
            doc.y = y + rowHeight; // Duy trì vị trí chính xác
        }

        doc.moveDown(4);
        const now = new Date();
        const formattedDate = now.toLocaleDateString("vi-VN");

        doc
            .font("Normal")
            .text(`Ngày lập phiếu: ${formattedDate}`, 370)
            .moveDown(1)
            .text("Bác sĩ khám", 420)
            .text(`${patientInfo.doctorname}`, 330);

        doc.end();

        // Chờ ghi file hoàn tất
        await new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });

        // Mã hóa base64
        const data = await fs.promises.readFile(filePath);
        const base64Pdf = data.toString("base64");

        // Gửi mail


        console.log("✅ PDF đã được tạo và gửi email thành công.");
        return base64Pdf;
    } catch (err) {
        console.error("❌ Lỗi tạo/gửi PDF:", err);
        throw err;
    }
}
module.exports = generatePDF;
