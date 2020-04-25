module.exports = (req, res, next) =>{
    if(req.session.userId){
        return res.redirect('/') // SAR: If the user is logged in, redirect them to home page
    }
    next()
};