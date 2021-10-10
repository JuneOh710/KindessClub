import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import { orgLoggedIn, isVerified, sendEmail } from '../utils/middleware.js';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';

const orgRouter = Router();



orgRouter.get('/', controller.renderOrgHome);


// EVENTS
// add event
orgRouter.get('/:orgId/add', orgLoggedIn, asyncHandle(isVerified), controller.renderNewEventForm);
orgRouter.post('/:ordId/events', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.saveEvent));
// view and manage events
orgRouter.get('/:orgId/events', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEvents));
orgRouter.get('/:orgId/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEvent));
orgRouter.get('/:orgId/events/:eventId/edit', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.renderEditForm));
orgRouter.put('/:orgId/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.editEvent));
orgRouter.delete('/:orgId/events/:eventId', orgLoggedIn, asyncHandle(isVerified), asyncHandle(controller.deleteEvent));


// register organization
orgRouter.get('/register', controller.renderRegisterForm);
orgRouter.post('/', asyncHandle(sendEmail), asyncHandle(controller.saveOrganization));


// login to organization
orgRouter.get('/login', controller.renderLoginForm);
orgRouter.post('/login', passport.authenticate('local', { failureRedirect: '/org/login', failureFlash: true }), controller.redirectOrgHome);

// logout from org account
orgRouter.get('/:orgId/logout', orgLoggedIn, controller.logoutOrg);

// get verified page 
orgRouter.get('/get-verified', controller.renderGetVerified);


export default orgRouter;