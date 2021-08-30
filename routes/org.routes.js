import { Router } from 'express';

const orgRouter = Router();

orgRouter.get('/', function (req, res, next) {
    res.render('org.views.ejs');
});

export default orgRouter;