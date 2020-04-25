const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

app.use(fileUpload());

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(expressSession({
    secret: 'leeroy jenkins'
}));

app.listen(4000, ()=>{
    console.log('App listening on port 4000 ...')    
});

const validateMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');


app.use('/posts/store',validateMiddleWare);

/* app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/post',(req,res)=>{
    res.render('post')
}) */

//const newPostController = require('./controllers/newPost');
//const storePostController = require('./controllers/storePost');
//const getPostController = require('./controllers/getPost');

const homeController = require('./controllers/home.');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

app.get('/', homeController);

// app.get('/post/:id', getPostController);
//
// app.post('/posts/store', storePostController);
//
// app.get('/posts/new', newPostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);