/** Initialisieren des Moduls */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema Definition nach: http://mongoosejs.com/docs/validation.html
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

/** Modul nach außen zugänglich machen */
module.exports = mongoose.model('Person', personSchema);
