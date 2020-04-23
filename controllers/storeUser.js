const User = require('../models/User');
const path = require('path');

module.exports = (req,res)=>{
    User.create(req.body, (error, user) => {
        console.log(error); // SAR: if there is an error it is logged and the user is redirected to registration
        if (error){
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
};