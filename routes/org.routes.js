import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import asyncHandle from '../utils/asyncHandle.js';

const orgRouter = Router();

orgRouter.get('/', controller.renderOrgHome);

// register organization
orgRouter.get('/register', controller.renderRegisterForm);
orgRouter.post('/', asyncHandle(controller.saveOrganization));

// add event
orgRouter.get('/add', controller.renderNewEventForm);
orgRouter.post('/events', asyncHandle(controller.saveEvent));



export default orgRouter;