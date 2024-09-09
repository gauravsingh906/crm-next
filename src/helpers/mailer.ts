import User from '@/models/user.model';

import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

const getVerificationEmailHtml = (hashedToken: any) => `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h2 { color: #333; }
            .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .button:hover { background-color: #0056b3; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello,</h2>
            <p>We received a request to verify your email address. Please click the button below to verify your email:</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">Verify Your Email</a>
            <p>
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br></p>
            <p>If you did not request this, you can ignore this email.</p>
            <p>Thank you!</p>
        </div>
    </body>
    </html>
`;

// Function to generate HTML for password reset
const getPasswordResetHtml = (hashedToken: any) => `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
            .container { max-width: 600px; margin: 20px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h2 { color: #333; }
            .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .button:hover { background-color: #0056b3;  color:white}
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello,</h2>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">Reset Your Password</a>
              or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br></p>
            
            <p>If you did not request this, you can ignore this email.</p>
            <p>Thank you!</p>
        </div>
    </body>
    </html>
`;




export const sendEmail = async ({ email, emailType, userId }: any) => {


    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log(hashedToken, "hashed-token")

        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(userId
                , {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                        //expiry one hour timer
                    }
                }
            )
        }
        else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId
                , {
                    $set: {
                        forgetPasswordToken: hashedToken,
                        forgetPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }
        // Generate the email content based on the type

        const transporter = nodemailer.createTransport({
            service: 'gmail',

            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });


        const mailOptions = {
            from: 'surajsingh8xm@gmail.com',
            to: email,
            subject: emailType == 'VERIFY' ? "Verify your Email" : "Reset your Password",
            html: emailType === 'VERIFY'
                ? getVerificationEmailHtml(hashedToken)
                : getPasswordResetHtml(hashedToken)
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}