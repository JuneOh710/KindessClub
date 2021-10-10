import { Router } from 'express';
import asyncHandle from '../utils/asyncHandle.js';
import Event from '../models/event.js';
import * as middleware from '../utils/middleware.js';

const eventsRouter = Router();
eventsRouter.get('/', middleware.userLoggedIn, asyncHandle(async function (req, res, next) {
    const events = await Event.find({});

    res.render('events.views.ejs', { events });
}));

eventsRouter.get('/:eventId', middleware.userLoggedIn, asyncHandle(async function (req, res, next) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    res.render('event.views.ejs', { event });
}));

// register user to event
eventsRouter.post('/:eventId', middleware.userLoggedIn, asyncHandle(async function (req, res, next) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    console.log('req.user =======>', req.user);
    event.registeredUsers.push(req.user);
    await event.save();
    res.redirect(`/events/${event._id}`);
}))


export default eventsRouter;