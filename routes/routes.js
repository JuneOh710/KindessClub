import { Router } from 'express';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';
import * as middleware from '../utils/middleware.js';
import * as controller from '../controllers/org.controllers.js';
import Organization from '../models/organization.js';
import Event from '../models/event.js';

const router = Router();
router.get('/', function (req, res, next) {
  res.render('home.views.ejs');
});

router.get('/dashboard', middleware.userLoggedIn, asyncHandle(async (req, res, next) => {
  const allEvents = await Event.find({});
  const threeEvents = allEvents.slice(0, 3);
  // console.log(threeEvents)
  res.render('dashboard.views.ejs', { threeEvents });
}));

// register user account
router.get('/users/register', (req, res, next) => {
  res.render('user-register.views.ejs')
});
// save user account
router.post('/users', asyncHandle(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const name = firstName + " " + lastName;
  const username = email;
  const userType = "general";
  const user = new Organization({ name, email, username, userType });
  await Organization.register(user, password);
  res.redirect('/');
}));

// login user account
router.get('/users/login', (req, res, next) => {
  res.render('user-login.views.ejs');
})

router.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), (req, res, next) => {
  req.flash('success', 'logged in successfuly')
  res.redirect('/dashboard')
})

// logout from user account
router.get('/users/logout', (req, res, next) => {
  req.logout();
  req.flash('success', 'logged out');
  res.redirect('/');
})


// admin stuff
router.get('/admin', middleware.isAdmin, controller.renderAdminPage);
router.post('/admin/verify', middleware.isAdmin, controller.verifyOrg);
router.post('/admin/invalidate', middleware.isAdmin, controller.invalidateOrg);


export default router;
