const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user ) =>{
        if(error || !user )
            return res.redirect('/'); // SAR: Hvis der er fejl i bruger validationen, sendes sessionen tilbage til home
        next()
    })
};