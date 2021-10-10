import { Router } from 'express';
import asyncHandle from '../utils/asyncHandle.js';
import Event from '../models/event.js';
import Organization from '../models/organization.js';
import * as middleware from '../utils/middleware.js';

const eventsRouter = Router();
// all events page
eventsRouter.get('/', middleware.userLoggedIn, asyncHandle(async function (req, res, next) {
    const allEvents = await Event.find({});
    let { pageNumber } = req.query;
    if (!pageNumber) {
        pageNumber = 1;
    }
    const fourEvents = allEvents.slice(4 * (pageNumber - 1), 4 * pageNumber);
    res.render('events.views.ejs', { pageNumber, fourEvents, allEvents });
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
    const user = await Organization.findById(req.user._id);
    event.registeredUsers.push(req.user);
    user.registeredEvents.push(event);
    await event.save();
    await user.save();
    res.redirect(`/events/${event._id}`);
}));

// remove user from event
eventsRouter.put('/:eventId', middleware.userLoggedIn, asyncHandle(async function (req, res, next) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    const user = await Organization.findById(req.user._id);
    event.registeredUsers.remove(req.user);
    user.registeredEvents.remove(event);
    await event.save();
    await user.save();
    res.redirect(`/events/${event._id}`);
}))

export default eventsRouter;