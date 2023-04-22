const ProjectList = require('../models/projectModel');
const IssueList = require('../models/issues');

module.exports.createProject = function(req, res) {
  res.render('createproject', {
    title: 'Create Project'
  });
}

// Create project
module.exports.create = async function(req, res) {
  try {
    const project = await ProjectList.create({
      projectname: req.body.projectname,
      projectauthor: req.body.projectauthor,
      projectdescription: req.body.projectdescription
    });
    console.log('Project is created successfully:', project);
    return res.redirect('/');
  } catch (err) {
    console.error('Error in creating project:', err);
    return res.status(500).send('Internal Server Error');
  }
}


module.exports.projectIssue= async function(req,res){
    console.log('req.query.projectid',req.query.projectid)
    let project=await ProjectList.findById(req.query.projectid)
    let issuePro = await IssueList.find({ projectRef: req.query.projectid });
    console.log("project",project)
    console.log("issuePro",issuePro)
    let uniqueArray=[];
    for(i of issuePro){
        for(j of i.labels){
            uniqueArray.push(j);
        }
    }
    let uniqueSet = [...new Set(uniqueArray)]
    console.log('uniqueSet',uniqueSet)
    return res.render('projectDetailsPage',{
        project:project,
        issue:issuePro,
        labelSet:uniqueSet,
        showIssue:true,
        title:'project details page'
    })
}