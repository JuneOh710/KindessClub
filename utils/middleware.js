import nodemailer from 'nodemailer';


export const orgLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in');
        return res.redirect('/org/login')
    }
    next();
}

export const isVerified = async function (req, res, next) {
    if (!req.user.verified) {
        req.flash('error', 'this account is not verified');
        return res.redirect('/org/get-verified');
    }
    next();
}

export const sendEmail = async function (req, res, next) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info.kindnessclub@gmail.com',
            pass: 'crackingthecodinginterview6thedition'
        },
    });
    const { orgName: name, orgEmail: email } = req.body;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'info.kindnessclub@gmail.com', // sender address
        to: "info.kindnessclub@gmail.com", // list of receivers
        subject: "New organization sign up!", // Subject line
        text: `${name} registered to become a partner!\nContact: ${email}`, // plain text body
    });
    next();
}