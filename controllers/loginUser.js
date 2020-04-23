const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) =>{
    const { username, password } = req.body;

    User.findOne({username:username}, (error,user) => {
        if (user){
            bcrypt.compare(password, user.password, (error, same) =>{
                if(same) {
                    req.session.userId = user._id; // SAR: Vi tildeler UserId til sessionen så hver gang brugeren laver en req fra serveren, sendes cookie id'et som verifikation
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }
        else{
            res.redirect('/auth/login')
        }
    })
};