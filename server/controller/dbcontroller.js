/** Initialisieren der Module. */
import mongoose from 'mongoose';
import shell from 'shelljs';

mongoose.Promise = global.Promise;

/** Zugang zum Datenbank */
const url = 'mongodb://127.0.0.1/karte_db';

/** Modul nach außen zugänglich machen mit "module.exports" */
module.exports = {
    // Initialisieirung der Datenbankverbindung
    initdb: () => {
        mongoose.connect(url, {useMongoClient: true});
        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    // Anlegen der Daten in der Datenbank aus einer Datei
    populate: () => {
        // Populate database
        const command = 'mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray';
        shell.exec(command, {silent: true});
    }
};