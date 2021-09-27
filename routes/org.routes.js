import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import { orgLoggedIn, isVerified, sendEmail, isAdmin } from '../utils/middleware.js';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';

const orgRouter = Router();



orgRouter.get('/', controller.renderOrgHome);


// EVENTS
// add event
orgRouter.get('/add', orgLoggedIn, asyncHandle(isVerified), controller.renderNewEventForm);
orgRouter.post('/events', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.saveEvent));
// view and manage events
orgRouter.get('/events', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEvents));
orgRouter.get('/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEvent));
orgRouter.get('/events/:eventId/edit', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEditForm));
orgRouter.put('/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.editEvent));
orgRouter.delete('/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.deleteEvent));


// register organization
orgRouter.get('/register', controller.renderRegisterForm);
orgRouter.post('/', asyncHandle(sendEmail), asyncHandle(controller.saveOrganization));


// login to organization
orgRouter.get('/login', controller.renderLoginForm);
orgRouter.post('/login', passport.authenticate('local', { failureRedirect: '/org/login', failureFlash: true }), controller.redirectOrgHome);

// logout from org account
orgRouter.get('/logout', orgLoggedIn, controller.logoutOrg);

// get verified
orgRouter.get('/get-verified', controller.renderGetVerified);

// admin stuff
// view all the organizations verification status and modify them
orgRouter.get('/admin', isAdmin, controller.renderAdminPage);
orgRouter.post('/admin/verify', isAdmin, controller.verifyOrg);
orgRouter.post('/admin/invalidate', isAdmin, controller.invalidateOrg);


export default orgRouter;