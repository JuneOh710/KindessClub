import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import ejsMate from 'ejs-mate';
import path from 'path'
import mogan from 'morgan'

import router from './routes/routes.js';

const app = express();
const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));

// view engine setup
app.engine('ejs', ejsMate)
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(mogan('dev'))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { errorMessage: err.message });
});


const port = 3000;
app.listen(port, () => { console.log(`listending to port ${port}`) })
export default app;
