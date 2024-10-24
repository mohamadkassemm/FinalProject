const nodemailer = require("nodemailer");

exports.sendEmail = async (options)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                password: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `Name <${process.env.SENDER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        await transporter.sendMail(mailOptions);
        
    }catch(err){
        console.log(err);
    }
}