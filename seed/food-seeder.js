var Food = require('../models/food');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/food');

var foods = [
    new Food({
        imagePath: 'images/doi.JPG',
        title: 'VOlanath doi vander',
        description: 'finest doi in locality',
        price: 5
    }),
    new Food({
        imagePath: 'images/chom_chom.png',
        title: 'Kalajam misti',
        description: 'finest sweetes in bazar',
        price: 9
    }),
    new Food({
        imagePath: 'images/rosgola.jpg',
        title: 'trop misti',
        description: 'finest sweets in town',
        price: 10
    })

];
var done = 0;
for (var i = 0; i < foods.length; i++) {
    foods[i].save(function(err, result) {
        done++;
        if (done === foods.length) {
            exit();
        }

    });


}

function exit() {
    mongoose.disconnect();
}