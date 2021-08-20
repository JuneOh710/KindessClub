import { Router } from 'express';
const indexRouter = Router();

/* GET index page. */
indexRouter.get('/', function (req, res, next) {
  res.render('index.views.ejs');
});

export default indexRouter;
