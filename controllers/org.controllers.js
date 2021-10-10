import Organization from "../models/organization.js";
import Event from "../models/event.js";
import mongoose from "mongoose";

export const renderOrgHome = function (req, res, next) {
    res.render('org.views.ejs');
}

// EVENTS
// add event
export const renderNewEventForm = function (req, res, next) {
    res.render('org-add-event.views.ejs');
}
export const saveEvent = async function (req, res, next) {
    const { eventName: name, eventDate: date, eventStart: startTime, eventEnd: endTime, eventDetails: details, address } = req.body;
    const coordinates = req.body.eventLocationCoordinates.split(',');
    const location = { type: req.body.eventLocationType, coordinates };
    const organization = req.user._id;
    const event = new Event({ name, date, startTime, endTime, details, location, organization, address });
    await event.save();
    res.redirect(`/org/${organization}/events/${event._id}`);
}
export const renderEvents = async function (req, res, next) {
    const { orgId } = req.params;
    const allEvents = await Event.find({ organization: mongoose.Types.ObjectId(orgId) });
    res.render('org-events.views.ejs', { allEvents });
}
export const renderEvent = async function (req, res, next) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    const { name, date, startTime, endTime, details, registeredUsers, location, address } = event;
    const dateList = date.toString().split(" ", 4);
    res.render('org-event.views.ejs', { name, dateList, startTime, endTime, details, registeredUsers, location, eventId, address });
}

export const renderEditForm = async function (req, res, next) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    const { name, date, startTime, endTime, details, registeredUsers, location } = event;
    const dateList = date.toString().split(" ", 4);
    res.render('org-event-edit.views.ejs', { name, dateList, startTime, endTime, details, registeredUsers, location, eventId });
}

export const editEvent = async function (req, res, next) {
    const { eventId, orgId } = req.params;
    const { eventName: name, eventDate: date, eventStart: startTime, eventEnd: endTime, eventDetails: details, address } = req.body;
    const coordinates = req.body.eventLocationCoordinates.split(',');
    const location = { type: req.body.eventLocationType, coordinates };
    await Event.findByIdAndUpdate(eventId, { name, date, startTime, endTime, details, location, address });
    res.redirect(`/org/${orgId}/events/${eventId}`);
}

export const deleteEvent = async function (req, res, next) {
    const { eventId, orgId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);
    console.log('event===>', event)
    for (let userId of event.registeredUsers) {
        let user = await Organization.findById(userId);
        user.registeredEvents.remove(event._id);
        await user.save();
    }
    res.redirect(`/org/${orgId}/events`);
}


// register organization
export const renderRegisterForm = function (req, res, next) {
    res.render('org-register.views.ejs');
}
export const saveOrganization = async function (req, res, next) {
    const { orgName: name, orgEmail: email, orgPassword: password } = req.body;
    // const location = { type: req.body.orgLocationType, coordinates: req.body.orgLocationCoordinates.split(',') }
    const organization = new Organization({ name, email, username: email, userType: "organization" });
    await Organization.register(organization, password)
    res.redirect('/org')
}

// login organization
export const renderLoginForm = function (req, res, next) {
    res.render('org-login.views.ejs')
}
export const redirectOrgHome = function (req, res, next) {
    req.flash('success', 'logged in successfuly')
    res.redirect('/org');
}

// logout
export const logoutOrg = function (req, res, next) {
    req.logout();
    req.flash('success', 'logged out');
    res.redirect('/org');
}

// get verified
export const renderGetVerified = function (req, res, next) {
    res.render('org-get-verified.views.ejs');
}

// render admin page
export const renderAdminPage = async function (req, res, next) {
    const allOrgs = await Organization.find({ userType: "organization" });
    res.render('org-admin.views.ejs', { allOrgs });
}

// verify org
export const verifyOrg = async function (req, res, next) {
    const filter = { _id: req.body.id };
    const update = { verified: true };
    await Organization.findOneAndUpdate(filter, update);
    res.redirect('/admin');
}

export const invalidateOrg = async function (req, res, next) {
    const filter = { _id: req.body.id };
    const update = { verified: false };
    await Organization.findOneAndUpdate(filter, update);
    res.redirect('/admin');
}