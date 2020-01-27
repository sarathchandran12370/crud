const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    name : {
        type : String
    },
    email : {
        type :String
    },
    phone : {
        type : String
    }
},{timestaps:true});

module.exports = mongoose.model('contact',schema);