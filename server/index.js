import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import path from 'path';
import bodyParser from 'body-parser';
import dbcontroller from './controller/dbcontroller';
import personController from './controller/personcontroller';
import routesController from './controller/routescontroller';

const app = express();

function checkAuth(req, res, next) {
    console.log('checkAuth ' + req.url);

    // für nicht admin nicht ausliefern
    if (req.url === '/admin' && (!req.session || !req.session.authenticated)) {
        res.render('pages/notauthorised', {status: 403});
        return;
    }
    if (req.url === '/persons' && (!req.session || !req.session.authenticated)) {
        res.render('pages/notauthorised', {status: 403});
        return;
    }
    next();
}

// Datenbank initialisieren
dbcontroller.initdb();

app.set('view engine', 'ejs');
app.set('views', path.resolve("./server/views"));

// Express configuration
app.use("/images", express.static(path.resolve("./server/public/images")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cookieSession({secret: 'examplesecret'}));
app.use(checkAuth);

app.get('/persons', personController.index);
app.delete('/persons', personController.removeAll);
app.get('/person/:id', personController.remove);

// Übername der Parameter von HTML Form und anlegen des Models
app.post('/person', personController.create);
app.post('/person/info', personController.info);
app.post('/person/neupin', personController.neupin);

app.get('/persons/:id/card/pin', personController.generatepin);
app.post('/persons/:id/card/pin', personController.generatepin);

// DB Befüllen
app.get('/populatedb', dbcontroller.populate);

app.post('/login', routesController.loginpost);
app.get('/login', routesController.loginget);
app.get('/customer', routesController.customer);
app.get('/admin', routesController.admin);
app.get('/logout', routesController.logout);
app.get('/', routesController.getroot);
app.get('*', routesController.catchAll);

app.listen(3113, () => {
    console.log('URL des Servers: http://localhost:3113');
});
