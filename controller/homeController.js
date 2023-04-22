const ProjectList=require('../models/projectModel');
// controller for main page or home page
module.exports.home=function(req,res){
    ProjectList.find({})
    .then(projectDet => {
        res.render('home', {
            project: projectDet,
            title: 'home page'
        });
    })
    .catch(err => {
        console.log('error', err);
        // handle the error here
    });

}