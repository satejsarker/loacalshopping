var mongoose = require('mongoose');



var Schema = mongoose.Schema;

//schma for a database
var schema = new Schema({
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    catagory: { type: String, required: false }
});


//model export
module.exports = mongoose.model('food', schema);