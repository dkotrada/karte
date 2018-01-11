import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const url = 'mongodb://127.0.0.1/karte_db';
const sh = require('shelljs');

module.exports = {
    initdb: (req, res) => {
        mongoose.connect(url, {useMongoClient: true});
        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    populate: () => {
        // Populate database
        const command = 'mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray';
        sh.exec(command, {silent: true});
    }
};