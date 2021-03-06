/******************************************************************************
 * Copyright 2018 Dieter Konrad && Dieter Shuler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*******************************************************************************/

/** Initialisieren der Module. */

// NodeJs Module
import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import path from 'path';
import bodyParser from 'body-parser';

// Eigene Module
import dbcontroller from './controller/dbcontroller';
import personController from './controller/personcontroller';
import routesController from './controller/routescontroller';
import conf from './config';
// Ein Express App anlegen
const app = express();

/**
 * Die Funktion `checkAuth` überprüft die URL der Webseite
 * und Cookie des Benutzers. Wenn Cookie nicht gesetzt
 * dann wird die Seite nicht angezeigt.
 */
function checkAuth(req, res, next) {

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

/** Datenbank initialisieren */
dbcontroller.initdb();

/** Express Applikation anweisen die EJS Template engine zu benutzen*/
app.set('view engine', 'ejs');

/** Die EJS Templates Verzeichnis setzen */
app.set('views', path.resolve("./server/views"));

/** Express Konfiguration Anweisungen
 *
 * Die statischen Dateien aus dem extra
 * Verzeichniss auszuliefern
 * */
app.use("/images", express.static(path.resolve("./server/public/images")));
/** Verarbeiten der Anfragen vom Browser */
app.use(bodyParser.urlencoded({extended: false}));
/** Verarbeiten der Cookies vom Browser */
app.use(cookieParser());
/** Verwalten der Sessions */
app.use(cookieSession({secret: 'examplesecret'}));
/** Funktion zur überprüfung der Cookies */
app.use(checkAuth);


/** Routen der Anfragen GET, POST, DELETE
 *
 * Die Anfrage ein eine Route wird der entsprechenden Funktion
 * zugewiesen. Die Funktion verarbeitet die Anfrage weiter
 */
app.get('/persons', personController.index);
app.delete('/persons', personController.removeAll);
app.get('/person/:id', personController.remove);
app.get('/login', routesController.loginget);
app.get('/admin', routesController.admin);
app.get('/logout', routesController.logout);
app.post('/person', personController.create);
app.post('/login', routesController.loginpost);

/** Kunde verwaltet seine eigene Daten */
app.get('/customer', routesController.customer);
app.post('/person/info', personController.info);
app.post('/person/neupin', personController.neupin);

/** Generierung der PIN vom Administrator */
app.get('/persons/:id/card/pin', personController.generatepin);
app.post('/persons/:id/card/pin', personController.generatepin);

// DB Befüllen
app.get('/populatedb', dbcontroller.populate);

app.get('/', routesController.getroot);
/** Alle anderen Routen */
app.get('*', routesController.catchAll);


/** Setzen des Ports für die App */
app.listen(conf.PORT, () => {
    // Information für die Konsole
    console.log('URL des Servers:', conf.HOST);
});
