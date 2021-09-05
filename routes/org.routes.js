import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import { orgLoggedIn } from '../utils/middleware.js';
import asyncHandle from '../utils/asyncHandle.js';
import passport from 'passport';

const orgRouter = Router();



orgRouter.get('/', controller.renderOrgHome);

// register organization
orgRouter.get('/register', controller.renderRegisterForm);
orgRouter.post('/', asyncHandle(controller.saveOrganization));

// add event
orgRouter.get('/add', orgLoggedIn, controller.renderNewEventForm);
orgRouter.post('/events', orgLoggedIn, asyncHandle(controller.saveEvent));


// login to organization
orgRouter.get('/login', controller.renderLoginForm);
orgRouter.post('/login', passport.authenticate('local', { failureRedirect: '/org/login', failureFlash: true }), controller.redirectOrgHome);

// logout from org account
orgRouter.get('/logout', orgLoggedIn, controller.logoutOrg);

export default orgRouter;