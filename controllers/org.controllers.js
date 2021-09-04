import Organization from '../models/organization.js';

export const renderOrgHome = function (req, res, next) {
    res.render('org.views.ejs');
}

export const renderNewEventForm = function (req, res, next) {
    res.render('org-add-event.views.ejs');
}

export const saveEvent = async function (req, res, next) {
    console.log(req.body);
    const event = {}
    res.render('org.views.ejs');
}