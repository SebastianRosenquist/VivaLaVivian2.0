const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img',image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            imag: '/img/' + image.name
        });
        res.redirect('/')
    })
};