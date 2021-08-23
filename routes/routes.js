import { Router } from 'express';
const router = Router();

/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('home.views.ejs');
});

router.get('/dashboard', function (req, res, next) {
  res.render('dashboard.views.ejs');
})
export default router;
