import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import ejsMate from 'ejs-mate';
import path from 'path';
import mogan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Organization from './models/organization.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

// route imports
import router from './routes/routes.js';
import eventsRouter from './routes/events.routes.js';
import projectsRouter from './routes/projects.routes.js';
import orgRouter from './routes/org.routes.js';


if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const databaseUrl = process.env.ATLAS_URL || process.env.LOCAL_MONGO_URL;
mongoose.connect(databaseUrl)
  .then(console.log('Database connected'))
  .catch(err => console.log('connection error:', err));


const app = express();
const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)));

// view engine setup
app.engine('ejs', ejsMate);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(mogan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(methodOverride('_method'));

// session middleware
const oneWeek = 1000 * 60 * 60 * 24 * 7;
const secret = process.env.SESSION_SECRET;
app.use(session({
  secret: secret,
  store: MongoStore.create({
    mongoUrl: databaseUrl,
    touchAfter: 24 * 3600,
    secret: secret
  }),
  name: 'kindnessSession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + oneWeek,
    maxAge: oneWeek
  }
}));


// auth middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Organization.authenticate()));
passport.serializeUser(Organization.serializeUser());
passport.deserializeUser(Organization.deserializeUser());


// flash middleware
app.use(function (req, res, next) {
  // make res.locals.X available as X in files rendering in this request cycle. 
  res.locals.currentUser = req.user  // req.user included in req by passport.js 
  res.locals.success = req.flash('success')  // undefined unless created new spot
  res.locals.error = req.flash('error')
  next()
})


// routers
app.use('/', router);
app.use('/events', eventsRouter);
app.use('/projects', projectsRouter);
app.use('/org', orgRouter);


app.all('*', function (req, res, next) {
  next(createError(404));
})

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
  res.render('error', { errorMessage: err.message, errorStatus: err.status });
});


const port = (process.env.PORT || 3000);
app.listen(port, () => { console.log(`listending to port ${port}`) });
export default app;
