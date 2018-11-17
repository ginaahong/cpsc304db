// server side

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getLogin, gotoSettings,updateUser} = require('./routes/login');
const {getMainPage, getMainDate, getMainPrice, getAccCreatePage} = require('./routes/index');

const {getUsers, getBuyers, getSellers, insertUser, insertSeller} = require('./routes/users');
const {getAddPost} = require('./routes/addposts')
const {getPostPage, soldUpdate} = require('./routes/products')
const {getPriceRange ,getPriceTable} = require('./routes/popq')

const {getProductComments} = require('./routes/seepost')

const port = 5000;

// create connection to database
// mysql.createConnection takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'marketdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MarketDB!');
});
global.db = db;

app.set('port', process.env.port || port); // express will use specified port
app.set('views', __dirname + '/views'); // express will look at /views folder to render view
app.set('view engine', 'ejs') // configure template engine
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))) // conf express to use the public folder
app.use(fileUpload()); // configure fileUpload

// routes for the app
//General pages:
app.get('/', getMainPage);
app.get('/date', getMainDate);
app.get('/price', getMainPrice);
app.get('/login', getLogin);
app.get('/users', getUsers);
//Show separate list for buyers and sellers
app.get('/users/buyers/', getBuyers);
app.get('/users/sellers', getSellers);

//User account related:
app.post('/acc-settings', gotoSettings);
app.post('/update', updateUser);
app.get('/getacccreate', getAccCreatePage);
app.post('/getacccreate', insertUser);

//Product post related
app.get('/add_post', getAddPost);
app.get('/see_post/:postid', getProductComments);
//Update the post to sold, once transaction occurs
app.post('/sold:postid', soldUpdate)

app.get('/pop_q/chooseprice', getPriceRange); // gh
app.post('/pop_q/chooseprice', getPriceTable); // gh

// app.get('/pop_q/tag', getTagUser);
// app.get('/pop_q/comments', getUserComments);
/*
app.get('/productpost:postid', getPostPage);
app.get('/productpost/edit:uid', editPostPage);
app.get('/productpost/delete:uid', deletePostPage);
app.post('/add_post', addPost);     //require products.js
app.post('/add_user', addUser);    //require users.js
app.post('/add_seller', addSeller);    //require users.js?
*/

//If user sells a thing, he joins buyers list, if he purchases a thing, he joins sellers list
// app.post('/makepost-buy', insertUser);
app.post('/makepurchase', insertSeller);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
