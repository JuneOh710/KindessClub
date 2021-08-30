import { Router } from 'express';
const projectsRouter = Router();


projectsRouter.get('/', function (req, res, next) {
    res.render('projects.views.ejs')
})


export default projectsRouter;