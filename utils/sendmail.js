import nodemailer from "nodemailer"

export async function sendMail({to,subject,text}) {
    console.log("1")
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
    })
    console.log("2")
    const mailOptions ={
        from:process.env.EMAIL_USER,
        to,
        subject,
        text,
    }
    console.log("sasdasd",mailOptions)
    await transporter.sendMail(mailOptions)
}