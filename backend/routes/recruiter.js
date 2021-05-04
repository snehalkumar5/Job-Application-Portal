const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const protect = require("../utils");
const isEmpty = require("is-empty");
const Validator = require("validator");

const ValidateJobInput = require("../validation/job");
const ValidateUpdateRecruiter = require('../validation/updateRecruiter')

const Recruiter = require("../models/recruiter");
const Job = require("../models/job");
const Application = require("../models/application");

const router = express.Router();


// @route GET recruiter/profile
// @desc Profile details
// @access protected
router.get("/profile", protect((req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({ error: "Forbidden" });
        return;
    }

    Recruiter.findById(result.id)
    .select('-password')
    .then(user=>res.json(user))
}));

// @route PUT recruiter/profile
// @desc Edit profile details
// @access protected
router.put("/profile", protect(async (req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({ error: "Forbidden" });
        return;
    }
    const {errors, isValid} = ValidateUpdateRecruiter(req.body);

    if (!isValid) {
        return res.status(400).json({errors});
    }
    await Recruiter
    .findByIdAndUpdate(result.id, req.body,
        {new: true},(err, user) => {
            if(err) return res.status(500).json(error);
            res.json(user);
            console.log(user);
        }
    )
}));



// add job route
// @route POST recruiter/job/add
// @desc Add new job
// @access Protected
router.post("/job/add", protect((req, res, result) => {
    
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }

    const {errors, isValid} = ValidateJobInput(req.body);

    if (!isValid) {
        return res.status(400).json({errors});
    }

    const recruiterId = result.id;
    const {title,positions,applications,deadline,salary,duration,type, skills} = req.body
    const newJob = new Job({
        recruiterId: recruiterId,
        title,
        positions,
        applications,
        deadline,
        skills,
        salary,
        duration,
        type,
        status: "Apply"
    });

    newJob
        .save()
        .then(job => res.json(job))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}));

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
      await callback(array[i], i);
  }
}

// @route GET recruiter/job/list
// @desc List all active jobs of the recruiter
// @access protected
router.get("/job/list", protect((req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({ error: "Forbidden" });
        return;
    }
    Job.find({recruiterId: result.id}).lean().exec((error, query) => {
        if (error) return res.status(500).json(error);
        console.log(query);
        res.json(query);
    });
}));

// @route: /recruiter/job
// @desc : Update your job
// @access: Private
router.put('/job/:id', protect( async (req, res, result) => {
  console.log("ads");
  
  if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    console.log(req.body);
    let errors = {};
    let applications = req.body.applications.toString();
    let positions = req.body.positions.toString();
  
    if(!applications || Validator.isEmpty(applications))
      errors.applications = "Field required";
    else if(!Validator.isInt(applications)) {
      errors.applications = "Invalid format";
    }
  
    if(!positions || Validator.isEmpty(positions))
      errors.positions = "Field required";
    else if(!Validator.isInt(positions)) {
      errors.positions = "Invalid format";
    }

    if(!isEmpty(errors)) return res.status(400).json({errors});
   
    const jobId = req.params.id;
    Job
      .findByIdAndUpdate(
        jobId,
        req.body,
        {new: true},
        (err, job) => {
          console.log(job);
          if(err) {
              res.status(500).json(err);
              return ;
          } else {
              res.json(job);
              return ;
          }
      }
      )
    .catch(error=>res.status(401).json(error))
  
  }))
  
  // @route: /recruiter/myjobs/:id
  // @desc : Get a selected job applicants
  // @access: Private
  router.get('/job/:id', protect( async (req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
  
    const jobId = req.params.id;
    const applications = await Application.findById(jobId);
  
    let ret = [];
    await asyncforEach(applications, async (job, id) => {
      let applicant = await Applicant.findById(job.applicantId);
      let resp = {};
      resp.applicant_name = applicant.name;
      resp.skills = applicant.skills;
      resp.dateofaccept = job.dateofaccept;
      resp.date = job.date; 
      resp.education = applicant.education;
      resp.applicant_rating = applicant.rating;
      resp.sop = job.sop;
      resp.status = job.status;
      resp.applicationId = job._id;
      resp.id = job._id;
  
      if(job.status !== "Rejected")
        ret.push(resp);
    })
    res.json(ret);                  
  
  }))
  
  // @route:  /recruiter/job/application/:id
  // @desc :  Change application's state, select applicant
  // @access: Private
  router.put('/job/application/:id', protect( async (req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
  
  
    let application = await Application.findById(req.params.id).lean();
    let jobId = application.jobId;
    let job = await Job.findOne({_id: jobId}).lean();
    let positions = job.positions;
  
    let applications = await Application.find({jobId, status: "Selected"});
    let count_positions = applications.length;
  
    if (count_positions === positions) {
      res.status(400).json({error: "All Positions filled"});
      return;
    }
  
    let newObj = req.body;
    if(req.body.status === "Selected") newObj.dateofaccept = new Date();
    const applicationId = req.params.id;
  
    JobApplication
      .findByIdAndUpdate(
        applicationId,
        newObj,
        {new: true},
        (err, job) => {
          if(err) {
              res.status(500).json(err);
              return ;
          } else {
              res.json(job);
              return ;
          }
      }
      )
  }))
  
  
// @route: /recruiter/job/cancel
// @desc : DELETE Job
// @access: Private
router.post("/job/cancel", protect((req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }

    if (!req.body.jobId || isEmpty(req.body.jobId)) {
        res.status(401).json({error: "Job ID not found"});
        return;
    }

    Job.findById(req.body.jobId)
    .then(job=>job.remove().then(()=>res.json({success:true})))
    .catch(error=>res.status(401).json({error:"Could not remove job"}))
}))


// @route: /recruiter/myemployees
// @desc : GET Employees from his jobs
// @access: Private
router.get('/myemployees', protect( async (req, res, result) => {
    if (result.type == config.USER_APPLICANT) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    let myJobs = await Job.find({recruiterId: result.id}).lean()
    const ret = []
    await asyncForEach(myJobs, async (job, id) => {
        const applications = await Application 
                                      .find({jobId: job._id})
                                      .lean()
        
        
        await asyncForEach(applications, async (application, id) => {
                if (application.status !== "Selected") return;
                let applicant = await Applicant.findById(application.applicantId).lean()
                let resp = {}
                resp.applicationId = application._id;
                resp.applicant_name = applicant.name;
                resp.title = job.title;
                resp.dateofaccept = application.dateofaccept;
                resp.type = job.type;
                resp.rating = application.applicant_rating;
                ret.push(resp);
              })
    })
    res.json(ret);
  }))
  
  // @route: /recruiter/myemployees/rate/:id
  // @desc :  Rate his employees
  // @access: Private
  router.put('/myemployees/rate/:id', protect( async (req, res, result) => {
    if (result.type != config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    const applicationId = req.params.id;
  
    let application = await Application.findById(applicationId).lean()
  
    application.applicant_rating = parseInt(req.body.rating);
  
    await Application
      .findByIdAndUpdate(application._id,
         application,
        {new: true},
        (err, application) => {
          if(err) {
              res.status(500).json(err);
              return ;
          } else {
              res.json(application);
              return ;
          }
      })
  
    let addedRating = req.body.rating;
    let totalRating = 0, totalRecs = 0;
    let applicantId = application.applicantId;
  
    let applications = await Application
                                .find({applicantId, applicant_rating: {$ne: -1}})
      
    await asyncForEach(applications, (application, id) => {
      totalRating += application.applicant_rating;
      totalRecs += 1;
    })                      
    
    let newRating = Math.round((totalRating + addedRating)/(1+totalRecs));
  
    await Applicant
            .findByIdAndUpdate(
              applicantId,
              {rating: newRating},
              {new: true}
            )
    
  }))
  
module.exports = router;