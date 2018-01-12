module.exports = {
    loginget: (req, res) => {
        res.render('pages/login');
    },
    loginpost: (req, res) => {
        if (req.body.username && req.body.username === 'admin@karte.de' && req.body.password && req.body.password === 'pass') {
            req.session.authenticated = true;
            res.redirect('/admin');
        }
        else {
            res.render('pages/abortion');
        }
    },
    logout: (req, res) => {
        delete req.session.authenticated;
        res.redirect('/');
    },
    getroot: (req, res) => {
        res.render('pages/index');
    },
    catchAll: (req, res) => {
        res.render('pages/errorpage');
    },
    admin: (req, res) => {
        res.render('pages/admin');
    },
    customer: (req, res) => {
        res.render('pages/customer');
    }
};