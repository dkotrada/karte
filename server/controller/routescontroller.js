module.exports = {
    loginget: function (req, res, next) {
        res.render('pages/login');
    },
    loginpost: function (req, res, next) {
        if (req.body.username && req.body.username === 'admin@karte.de' && req.body.password && req.body.password === 'pass') {
            req.session.authenticated = true;
            res.redirect('/admin');
        }
        else {
            res.render('pages/abortion');
        }
    },
    logout: function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    },
    getroot: function (req, res) {
        res.render('pages/index');
    },
    catchAll: function (req, res) {
        res.render('pages/errorpage');
    },
    admin: function (req, res) {
        res.render('pages/admin');
    },
    customer: function (req, res) {
        res.render('pages/customer');
    },


};