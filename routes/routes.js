import { Router } from 'express';
const router = Router();

/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('home.views.ejs');
});

router.get('/dashboard', function (req, res, next) {
  res.render('dashboard.views.ejs');
})

router.get('/events', function (req, res, next) {
  res.render('events.views.ejs')
})

router.get('/projects', function (req, res, next) {
  res.render('projects.views.ejs')
})

router.get('/events/event', function (req, res, next) {
  res.render('event.views.ejs')
})

export default router;
