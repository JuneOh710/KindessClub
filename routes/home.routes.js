import { Router } from 'express';
const homeRouter = Router();

/* GET home page. */
homeRouter.get('/', function (req, res, next) {
  res.render('home.views.ejs');
});

export default homeRouter;
