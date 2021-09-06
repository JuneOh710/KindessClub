import passport from 'passport';


export const orgLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in');
        return res.redirect('/org/login')
    }
    next();
}

export const isVerified = async function (req, res, next) {
    if (!req.user.verfied) {
        req.flash('error', 'request failed');
        return res.redirect('/org/get-verified');
    }
    next();
}