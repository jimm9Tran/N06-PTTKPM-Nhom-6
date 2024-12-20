const nodemailer =  require("nodemailer");

module.exports.sendMail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hell",
            pass: ""
        }
    });

    const mailOptions = {
        from: "hello",
        to: "fdsa",
        subject: "",
        text: " "
    };


    transporter.sendMail(mailOptions, function(erorr, info) {
        if (erorr) {
            console.log(erorr);
        }else {
            console("fff")
        }
    });
}