import { Router } from 'express';
import User from '../models/user.js';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';
import * as middleware from '../utils/middleware.js';

const router = Router();
router.get('/', function (req, res, next) {
  res.render('home.views.ejs');
});

router.get('/dashboard', middleware.userLoggedIn, function (req, res, next) {
  res.render('dashboard.views.ejs');
});

// register user account
router.get('/users/register', (req, res, next) => {
  res.render('user-register.views.ejs')
});

router.post('/users', asyncHandle(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const username = email;
  const user = new User({ firstName, lastName, email, username });
  await User.register(user, password);
  res.redirect('/');
}));

// login user account
router.get('/users/login', (req, res, next) => {
  res.render('user-login.views.ejs');
})

router.post('/users/login', passport.authenticate('userLocal', { failureRedirect: '/users/login', failureFlash: true }), (req, res, next) => {
  req.flash('success', 'logged in successfuly')
  res.redirect('/dashboard')
})

// logout from user account
router.get('/users/logout', (req, res, next) => {
  req.logout();
  req.flash('success', 'logged out');
  res.redirect('/');
})


export default router;
