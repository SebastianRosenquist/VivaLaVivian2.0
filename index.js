const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static('public'));

app.listen(4000, ()=>{
    console.log('App listening on port 4000 ...')    
});

const validateMiddleWare = require("./middleware/validationMiddleware");

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

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home.');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.post('/posts/store', storePostController);

app.get('/posts/new', newPostController);

app.get('/auth/register', newUserController);

app.post('/users/register', storeUserController);