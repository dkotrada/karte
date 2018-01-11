const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema Definition http://mongoosejs.com/docs/validation.html
const personSchema = new Schema({
    title: String,
    name: {type: String, required: true},
    vorname: {type: String, required: true},
    strasse: String,
    hausnummer: Number,
    stadt: String,
    postleitzahl: Number,
    telefon: Number,
    email: {type: String, required: true},
    card:
        {
            pin: {type: Number},
            uuid: {type: Number}
        }
});

module.exports = mongoose.model('Person', personSchema);
