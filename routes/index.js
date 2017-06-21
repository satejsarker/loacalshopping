var express = require('express');
var router = express.Router();
var session = require('express-session');
var food = require('../models/food');
//var csrf = require('csurf');
var passport = require('passport');
var mysql = require('mysql');
var pg = require('pg');
var ajax = require('ajax');
var mysql = require('mysql');
var Cart = require('../models/cart');
var stripe = require('stripe')
var Order = require('../models/order');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'local',
    password: 'satej@~'

});



var db = ('postgres://postgres:satej@~@localhost:1234/mysite');

router.get('/product', function(req, res, next) {
    res.render('productCreate');
});
router.get('/food', function(req, res) {
    var successMsg = req.flash('success')[0];
    food.find({ catagory: "food" }, function(err, docs) {
        var foodchunk = [];
        var chunksize = 3;
        for (var i = 0; i < docs.length; i += 3) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('food', {
            title: 'food',
            foods: foodchunk,
            successMsg: successMsg,
            noMessage: !successMsg
        });
    });

});
//like
router.post('/like', function(req, res) {
    connection.query("update  testing set likes=likes+1 where pnames='" + req.body.name + "'");
});
//CONTACT FORM 
router.post('/cotact', function(req, res, next) {
    var message = req.flash("thank you for registration ");
    var info = { email: req.body.email, name: req.body.name, textmeg: req.body.message };
    connection.query("INSERT INTO contact set ?", info, function(err, result) {
        if (err) throw err;
    });
    res.render("sucess");
});
router.get('/contact', function(req, res) {
    res.render('contactus');
});
//wine
router.get('/wine', function(req, res) {
    var successMsg = req.flash('success')[0];
    food.find({ catagory: "wine" }, function(err, docs) {
        var foodchunk = [];
        var chunksize = 3;
        for (var i = 0; i < docs.length; i += 3) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('f', {
            title: 'wine',
            foods: foodchunk,
            successMsg: successMsg,
            noMessage: !successMsg
        });
    });

});
//cloth
//female
router.get('/female', function(req, res) {
    var successMsg = req.flash('success')[0];
    food.find({ catagory: "female" }, function(err, docs) {
        var foodchunk = [];
        var chunksize = 3;
        for (var i = 0; i < docs.length; i += 3) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('f', {
            title: 'female',
            foods: foodchunk,
            successMsg: successMsg,
            noMessage: !successMsg
        });
    });

});
//male
router.get('/male', function(req, res) {
    var successMsg = req.flash('success')[0];
    food.find({ catagory: "male" }, function(err, docs) {
        var foodchunk = [];
        var chunksize = 3;
        for (var i = 0; i < docs.length; i += 3) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('f', {
            title: 'Man',
            foods: foodchunk,
            successMsg: successMsg,
            noMessage: !successMsg
        });
    });

});



router.post('/main', function(req, res, next) {
    connection.query("SELECT * FROM testing WHERE catagory='" + req.body.search + "'and city='" + req.body.city + "'", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('main', {
            title: 'product',
            product: chunk
        });
    });
});

router.post('/breg', function(req, res, next) {

    var productreg = { bname: req.body.bname, city: req.body.city, state: req.body.state, locality: req.body.locality, zip: req.body.zip, address: req.body.address, email: req.body.email, mobile: req.body.mobile };
    connection.query("INSERT INTO productreg set ?", productreg, function(err, result) {
        if (err) throw err;
    });
    res.redirect('/sucess');
});


router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/');
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Local search engine ' });
});

router.get('/sucess', function(req, res, next) {
    res.render('no/sucess');

});
router.get('/admin', function(req, res, next) {
    res.render('admin');

});
router.get('/adsg1234MNB09123jjYTRSabbm128886MNBVHgakjgskdgakiqenxvcmaoswqewqwbnsvcvvpoywev', function(req, res, next) {
    res.render('info');

});

//admin1

//car_admin1
router.get('/adsg1234MNB09123jjYTwewwewe6na0000012RSabbm128886MNBVHgakjgskdgakiqenxvcmaoswqewqwbnsvcvvpoywev', function(req, res, next) {

    connection.query("SELECT * FROM testing where catagory='car'", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('test', {
            title: 'product',
            testing: chunk
        });
    });
});

// online product
router.get('/onlinepasasasdasdasdasdadasd121212121212Onlineasdasdbxcbgwescssaadas', function(req, res) {
    food.find(function(err, docs) {
        var foodchunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('admin_online', {
            title: 'admin',
            testing: foodchunk
        });
    });

});
//online adding
router.post('/addon', function(req, res) {
    var id = req.body.id;
    var link = req.body.link;
    var des = req.body.description;
    var price = req.body.price;
    var catagory = req.body.catagory;
    var title = req.body.pnames;
    food.insertMany({ imagePath: link, title: title, description: des, price: price, catagory: catagory }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
    res.redirect("/onlinep");
});
//online edit
router.post('/changes', function(req, res) {
    var id = req.body.id;
    var link = req.body.link;
    var des = req.body.description;
    var price = req.body.price;
    var catagory = req.body.catagory;
    food.findOneAndUpdate({ _id: id }, { $set: { link: link, description: des, price: price, catagory: catagory } }, { new: true }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
    res.redirect("/onlinep");
});
//online delete
router.delete('/deleteo/:id', function(req, res, error) {
    var id = req.params.id;
    food.findByIdAndRemove({ _id: id }, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
});
//online order 
router.get('/order', function(req, res) {
    Order.find(function(err, docs) {
        var foodchunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            foodchunk.push(docs.slice(i, i + chunksize));
        }
        res.render('admin_order', {
            title: 'admin',
            testing: foodchunk
        });
    });

});
// food admin
router.get('/food1234567asdfghjkl098765431qwertyyfoodyioombbbb', function(req, res, next) {

    connection.query("SELECT * FROM testing where catagory='food'", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('test', {
            title: 'product',
            testing: chunk
        });
    });
});
//bar admin
router.get('/nbbbvasdyttrrwuwowjba12312312399873jkxaskagkgakgbarkagsdkagkdgad', function(req, res, next) {

    connection.query("SELECT * FROM testing where catagory='bar'", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('test', {
            title: 'product',
            testing: chunk
        });
    });
});
//cloths
//customer admin
router.get('/contactdeatilskhlahslahsldhlasCOntaactmmzxmmzxmnbvzvvzvvzv8727721371727127nzxbzxzxbm', function(req, res, next) {

    connection.query("SELECT * FROM contact ", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('admin_cus', {
            title: 'product',
            testing: chunk
        });
    });
});
router.get('/nbbbvasdyttrrwuwowjba12312312399873jkxaskagkgakgkagsdkagkdgadcloths', function(req, res, next) {

    connection.query("SELECT * FROM testing where catagory='cloths'", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('test', {
            title: 'product',
            testing: chunk
        });
    });
});
//product adding admin
router.post('/add', function(req, res, next) {

    var productreg = { link: req.body.link, description: req.body.description, price: req.body.price, city: req.body.city, pnames: req.body.pnames, catagory: req.body.catagory, mobile: req.body.mobile };
    connection.query("INSERT INTO testing set ?", productreg, function(err, result) {
        if (err) throw err;
    });

});

// deleteting addmin 
router.delete('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    connection.query("DELETE FROM testing  WHERE id = ? ", [id], function(err, result) {
        if (err) throw err;
    });
});


//new registration admin
router.get('/Newb1234Tsa00016732jsbNEwbasnbdaskhashdakshd002222232323kjsdfkjshdfkhskdfhksdh', function(req, res, next) {

    connection.query("SELECT * FROM productreg", function(err, docs) {
        var chunk = [];
        var chunksize = 1;
        for (var i = 0; i < docs.length; i++) {
            chunk.push(docs.slice(i, i + chunksize));
        }
        res.render('admin_newp', {
            title: 'product',
            testing: chunk
        });
    });
});
//delete admin_newp
router.delete('/deleter/:id', function(req, res, next) {
    var id = req.params.id;

    connection.query("DELETE FROM  productreg  WHERE id = ? ", [id], function(err, result) {
        if (err) throw err;
    });
});

//edit admin 
router.post('/edit', function(req, res) {
    var query = 'UPDATE testing SET link = ?,description = ?,price = ?,city = ?,pnames = ?,catagory = ?,mobile = ? WHERE id = ?';
    // var productreg = { link: , description: , price: , city: , pnames: , catagory: , mobile:  };
    connection.query(query, [req.body.link, req.body.description, req.body.price, req.body.city, req.body.pnames, req.body.catagory, req.body.mobile, req.body.id], function(error, results, fields) {
        if (error) throw error;
    });

});
//testing for search
router.get('/search', function(req, res, next) {

    connection.query('SELECT first_name from user_name where first_name like "%' + req.query.key + '%"', function(err, rows, fields) {
        if (err) throw err;
        var data = [];
        for (i = 0; i < rows.length; i++) {
            data.push(rows[i].first_name);
        }
        res.end(JSON.stringify(data));
    });
});

//location 
router.get('/location', function(req, res, next) {

    connection.query('SELECT name from blr_local where name like "%' + req.query.key + '%"', function(err, rows, fields) {
        if (err) throw err;
        var data = [];
        for (i = 0; i < rows.length; i++) {
            data.push(rows[i].name);
        }
        res.end(JSON.stringify(data));
    });
});
// shopping add and payment
router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    food.findById(productId, function(err, food) {
        if (err) {
            return res.redirect('/');

        }
        cart.add(food, food.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shoppping-cart');
    });
});
router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shoppping-cart');
});
router.get('/removeAll/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/shoppping-cart');
});
router.get('/shoppping-cart', function(req, res, next) {

    if (!req.session.cart) {
        return res.render('shoppping-cart', { product: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('shoppping-cart', { product: cart.generateArray(), totalPrice: cart.totalPrice });
});
router.get('/checkout', isLoggedIn, function(req, res, next) {

    if (!req.session.cart) {
        return res.redirect('/shoppping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('checkout', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shoppping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_6NIfotUJqbHM5G3iDdPuIDrb"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Charge for testing"
    }, function(err, charge) {
        // asynchronously called
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id

        });
        order.save(function(err, result) {
            req.flash('success', 'successfuly brought');
            req.session.cart = null;
            res.redirect('/food');
        });

    });

});
// user related 


/* GET users listing. */
//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/singup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('singup', { title: 'singup', /*csrfToken: req.csrfToken(),*/ messages: messages, hasErrors: messages.length > 0 });
});
router.post('/singup', passport.authenticate('local.singup', {

    failureRedirect: 'singup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('profile');
    }
});

router.get('/singin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('singin', { title: 'singin', /*csrfToken: req.csrfToken(),*/ messages: messages, hasErrors: messages.length > 0 });
});
router.post('/singin', passport.authenticate('local.singin', {
    failureRedirect: 'singup',
    failureFlash: true,
    if (admin = true) {
        res.render('info');
    }
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('profile');
    }
});
router.get('/profile', isLoggedIn, function(req, res, next) {
    Order.find({ user: req.user }, function(err, orders) {
        if (err) {
            return res.write('Eroor !');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('profile', { orders: orders });
    });
});
router.get('/t', function(req, res, next) {
    res.render('no/t');
});


router.use('/', notLoggedIn, function(req, res, next) {
    next();

});




module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/singin');

}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.render('index');

}