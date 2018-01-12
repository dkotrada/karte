import PersonModel from '../model/person';

module.exports = {
    create: (req, res) => {
        const kartennummer = Math.floor(Math.random() * 999999);
        const person = new PersonModel({
            title: req.body.title,
            name: req.body.name,
            vorname: req.body.vorname,
            strasse: req.body.strasse,
            hausnummer: req.body.hausnummer,
            stadt: req.body.stadt,
            postleitzahl: req.body.postleitzahl,
            telefon: req.body.telefon,
            email: req.body.email,
            card: {
                pin: 0,
                uuid: kartennummer
            }
        });
        person.save((err, person) => {
            if (err) {
                res.render('pages/abortion');
                console.log(err);
            } else {
                res.render('pages/confirmation');
                console.log(person);
            }
        });
    },
    neupin: (req, res) => {
        // z.B 59f74c24488a29eabb42414a
        PersonModel.findOne({'email': req.body.email}, (err, person) => {
            if (err) {
                return res.send(err);
            }
            person.card.pin = req.body.pin;
            console.log("Person: ", person);

            person.save((err, person) => {
                if (err) {
                    res.render('pages/abortion');
                    console.log(err);
                } else {
                    res.render('pages/confirmpin');
                    console.log(person);
                }
            });
        });

    },
    info: (req, res) => {
        PersonModel.findOne({'email': req.body.email}, (err, person) => {
            if (err) {
                return res.send(err);
            } else {
                if (req.body.pin == person.card.pin) {
                    res.render('pages/personinfo', {
                        person: person
                    });
                } else {
                    res.render('pages/abortion');
                }
            }
        });
    },
    index: (req, res) => {
        PersonModel.find({}, (err, peoples) => {
            if (err) {
                return res.send(err);
            } else {
                res.render('pages/personen', {
                    persons: peoples
                });
            }
        });
    },
    remove: (req, res) => {
        const id = req.params.id;
        PersonModel.remove({'_id': id}, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.render('pages/confirmdelete');
            }
        })
    },
    removeAll: (req, res) => {
        PersonModel.remove({}, (err) => {
            if (err) {
                return res.send(err);
            }
            res.send('200');
        })
    },
    generatepin: (req, res) => {
        const id = req.params.id;
        // Zahlen von 0 - 9999
        const zahl = Math.floor(Math.random() * 9999);
        PersonModel.findOne({'_id': id}, (err, person) => {
            if (err) {
                console.log(err);
                res.send({pin: 0}); // Fehler
            } else {
                // PIN in der Datenbank schreiben
                person.update({card: {pin: zahl}}).exec();
                //res.send({pin: zahl});
                res.render('pages/confirmpin');
            }
        });
    }
};
