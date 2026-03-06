import nodemailer from "nodemailer";
import config from "../../../config";
import ApiError from "../../errors/api-error";

const emailSender = async ({
    email,
    subject,
    html,
}: {
    email: string;
    subject: string;
    html: string;
}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.smtp.user,
            pass: config.smtp.pass,
        },
    });

    const mailOptions = {
        from: `"${config.company_name}" <${config.smtp.sender}>`,
        to: email,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new ApiError(500, "Error sending email");
    }
};

export default emailSender;
