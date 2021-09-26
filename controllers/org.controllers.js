import passport from "passport";
import Organization from "../models/organization.js";

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
    const { orgName: name, orgEmail: email, orgPassword: password } = req.body;
    const location = { type: req.body.orgLocationType, coordinates: req.body.orgLocationCoordinates.split(',') }
    const organization = new Organization({ name, email, username: email, location });
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

// render events
export const renderEvents = function (req, res, next) {
    res.render('org-view-events.views.ejs');
}

// render admin page
export const renderAdminPage = async function (req, res, next) {
    const allOrgs = await Organization.find({});
    console.log(allOrgs)
    res.render('org-admin.views.ejs', { allOrgs });
}

// verify org
export const verifyOrg = async function (req, res, next) {
    const filter = { _id: req.body.id };
    const update = { verified: true };
    const org = await Organization.findOneAndUpdate(filter, update);
    res.redirect('/org/admin');
}