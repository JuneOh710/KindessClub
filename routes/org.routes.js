import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import { orgLoggedIn, isVerified, sendEmail } from '../utils/middleware.js';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';

const orgRouter = Router();



orgRouter.get('/', controller.renderOrgHome);

// register organization
orgRouter.get('/register', controller.renderRegisterForm);
orgRouter.post('/', asyncHandle(sendEmail), asyncHandle(controller.saveOrganization));

// add event
orgRouter.get('/add', orgLoggedIn, asyncHandle(isVerified), controller.renderNewEventForm);
orgRouter.post('/events', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.saveEvent));


// login to organization
orgRouter.get('/login', controller.renderLoginForm);
orgRouter.post('/login', passport.authenticate('local', { failureRedirect: '/org/login', failureFlash: true }), controller.redirectOrgHome);

// logout from org account
orgRouter.get('/logout', orgLoggedIn, controller.logoutOrg);

// get verified
orgRouter.get('/get-verified', controller.renderGetVerified);

// view and manage events
orgRouter.get('/events', orgLoggedIn, asyncHandle(isVerified), controller.renderEvents);

// admin stuff
// view all the organizations verification status and modify them
orgRouter.get('/admin', controller.renderAdminPage);
orgRouter.post('/admin/verify', controller.verifyOrg);
orgRouter.post('/admin/invalidate', controller.invalidateOrg);


export default orgRouter;