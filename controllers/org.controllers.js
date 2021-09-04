import Organization from '../models/organization.js';

export const renderOrgHome = function (req, res, next) {
    res.render('org.views.ejs');
}

// add event
export const renderNewEventForm = function (req, res, next) {
    res.render('org-add-event.views.ejs');
}

export const saveEvent = async function (req, res, next) {
    res.render('org.views.ejs');
}

// register organization
export const renderRegisterForm = function (req, res, next) {
    res.render('org-register.views.ejs');
}

export const saveOrganization = async function (req, res, next) {
    console.log(req.body);
    res.send('hi');
}