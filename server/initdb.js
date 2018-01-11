import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1/karte_db';
const sh = require('shelljs');

module.exports = {
    initdb: (req, res) => {
        mongoose.connect(url, {useMongoClient: true});
        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    populationcheck: (req, res) => {
        // Connect using MongoClient
        MongoClient.connect(url, (err, db) => {
            // Use the admin database for the operation
            const adminDb = db.admin();

            db.listCollections({name: "people"}).toArray((err, items) => {
                // console.log(items[0].name);
                if (items[0].name == 'people') {
                    const command = 'mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray';
                    sh.exec(command, {silent: true});
                    return 0;
                } else {
                    // Populate database
                    const command = 'mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray';
                    sh.exec(command, {silent: true});
                }
            });
            db.close();
            return 0;
        });
    }
};