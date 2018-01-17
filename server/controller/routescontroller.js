
/** Modul nach außen zugänglich machen mit "module.exports" */
module.exports = {
    // Anzeigen der Loginseite
    loginget: (_, response) => {
        // Rendern des `*.ejs` Templates
        response.render('pages/login');
    },

    // Verarbeiten des Versendeten Formulars
    loginpost: (reqest, response) => {
        if (reqest.body.username && reqest.body.username === 'admin@karte.de' && reqest.body.password && reqest.body.password === 'pass') {
            reqest.session.authenticated = true;
            // Weiterleiten des Benutzers zur Adminseite
            response.redirect('/admin');
        }
        else {
            // Rendern des `*.ejs` Templates
            response.render('pages/abortion');
        }
    },

    // Administrator abmelden
    logout: (reqest, response) => {
        delete reqest.session.authenticated;
        // Weiterleiten des Benutzers zur Hauptseite
        response.redirect('/');
    },

    // Startseite anzeigen
    getroot: (_, response) => {
        // Rendern des `*.ejs` Templates
        response.render('pages/index');
    },

    // Anfragen auf nicht existierende Routen behandeln
    catchAll: (_, response) => {
        // Rendern des `*.ejs` Templates
        response.render('pages/errorpage');
    },

    // Administrator Bereich anzeigen
    admin: (_, response) => {
        // Rendern des `*.ejs` Templates
        response.render('pages/admin');
    },

    // Kunden Bereich anzeigen
    customer: (_, response) => {
        // Rendern des `*.ejs` Templates
        response.render('pages/customer');
    }
};