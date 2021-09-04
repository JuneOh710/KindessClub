import { Router } from 'express';
import * as controller from '../controllers/org.controllers.js';
import asyncHandle from '../utils/asyncHandle.js';

const orgRouter = Router();

orgRouter.get('/', controller.renderOrgHome);

// add event
orgRouter.get('/add', controller.renderNewEventForm);
orgRouter.post('/', asyncHandle(controller.saveEvent));



export default orgRouter;