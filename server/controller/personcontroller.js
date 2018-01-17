/** Initialisieren des Moduls */
import PersonModel from '../model/person';

/** Modul nach außen zugänglich machen mit "module.exports" */
module.exports = {
    /** Person anlegen */
    create: (reqest, response) => {
        /** Zufallszahl generieren */
        const kartennummer = Math.floor(Math.random() * 999999);

        /** Struktur der Daten in der Datenbank */
        const person = new PersonModel({
            title: reqest.body.title,
            name: reqest.body.name,
            vorname: reqest.body.vorname,
            strasse: reqest.body.strasse,
            hausnummer: reqest.body.hausnummer,
            stadt: reqest.body.stadt,
            postleitzahl: reqest.body.postleitzahl,
            telefon: reqest.body.telefon,
            email: reqest.body.email,
            card: {
                pin: 0,
                uuid: kartennummer
            }
        });
        // Abspeichern der Daten
        person.save((error, person) => {
            // Antwort Fehler oder Ok
            if (error) {
                // Rendern des `*.ejs` Templates
                response.render('pages/abortion');
            } else {
                // Rendern des `*.ejs` Templates
                response.render('pages/confirmation');
            }
        });
    },

    /** Kunde verwaltet seine eigene PIN */
    neupin: (reqest, response) => {
        // Holen der Daten aus der Datenbank
        PersonModel.findOne({'email': reqest.body.email}, (error, person) => {
            if (error) {
                return response.send(error);
            }
            person.card.pin = reqest.body.pin;

            // Speichern der Daten
            person.save((error, person) => {
                // Antwort Fehler oder Ok
                if (error) {
                    // Rendern des `*.ejs` Templates
                    response.render('pages/abortion');
                } else {
                    // Rendern des `*.ejs` Templates
                    response.render('pages/confirmpin');
                }
            });
        });

    },

    /** Details zu einer Person */
    info: (reqest, response) => {
        // Holen der Daten aus der Datenbank
        PersonModel.findOne({'email': reqest.body.email}, (error, person) => {
            // Antwort Fehler oder Ok
            if (error) {
                return response.send(error);
            } else {
                if (reqest.body.pin == person.card.pin) {
                    // Rendern des `*.ejs` Templates
                    response.render('pages/personinfo', {
                        person: person
                    });
                } else {
                    // Rendern des `*.ejs` Templates
                    response.render('pages/abortion');
                }
            }
        });
    },

    /** Auflisten aller Personen */
    index: (_, response) => {
        // Holen der Daten aus der Datenbank
        PersonModel.find({}, (error, peoples) => {
            // Antwort Fehler oder Ok
            if (error) {
                return response.send(error);
            } else {
                // Rendern des `*.ejs` Templates
                response.render('pages/personen', {
                    persons: peoples
                });
            }
        });
    },

    /** Entfernen einer Person aus der Datenbank */
    remove: (reqest, response) => {
        // Holen der Daten aus der Anfrage
        const id = reqest.params.id;
        // Entfernen der Daten aus der Datenbank
        PersonModel.remove({'_id': id}, (error) => {
            // Antwort Fehler oder Ok
            if (error) {
                return response.send(error);
            } else {
                // Rendern des `*.ejs` Templates
                response.render('pages/confirmdelete');
            }
        })
    },

    /** Entfernen aller Personen aus der Datenbank */
    removeAll: (_, response) => {
        // Entfernen der Daten aus der Datenbank
        PersonModel.remove({}, (error) => {
            // Antwort Fehler oder Ok
            if (error) {
                return response.send(error);
            }
            response.send('200');
        })
    },

    /** Generierung der PIN vom Administrator */
    generatepin: (reqest, response) => {

        // Holen der Daten aus der Anfrage
        const id = reqest.params.id;

        // Zahlen von 0 - 9999 generieren
        const zahl = Math.floor(Math.random() * 9999);

        // Holen der Daten aus der Datenbank
        PersonModel.findOne({'_id': id}, (error, person) => {
            // Antwort Fehler oder Ok
            if (error) {
                console.log(error);
                response.send({pin: 0}); // Fehler
            } else {
                // PIN in die Datenbank schreiben
                person.update({card: {pin: zahl}}).exec();
                // Rendern des `*.ejs` Templates
                response.render('pages/confirmpin');
            }
        });
    }
};
