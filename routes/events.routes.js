import { Router } from 'express';

const eventsRouter = Router();
eventsRouter.get('/', function (req, res, next) {
    res.render('events.views.ejs')
});

eventsRouter.get('/event', function (req, res, next) {
    res.render('event.views.ejs')
});


export default eventsRouter;