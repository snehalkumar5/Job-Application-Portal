const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const isEmpty = require("is-empty");
const protect = require("../utils");
const FuzzySearch = require("fuzzy-search");

const Job = require("../models/job");
const Application = require("../models/application");
const Applicant = require("../models/applicant");

const ValidateJobInput = require('../validation/job');
const ValidateUpdateApplicant = require('../validation/updateApplicant');
const ValidateApplication = require("../validation/application");

const router = express.Router();

// @route: /applicant/profile
// @desc : GET profile
// @access: Private
router.get('/profile', protect( async (req, res, result) => {
    if (result.type == config.USER_RECRUITER) return res.status(403).json({error: "Forbidden"});

    const applicantId = result.id;
    await Applicant
      .findOne({_id: applicantId})
      .select("-password")
      .then(user=>res.json(user))
}))

// @route: /applicant/profile
// @desc : PUT to edit profile
// @access: Private
router.put('/profile', protect( async(req, res, result) => {
    if (result.type == config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    const {errors, isValid} = ValidateUpdateApplicant(req.body);

    if (!isValid) return res.status(400).json({errors});

    const applicantId = result.id;
    await Applicant
    .findByIdAndUpdate(applicantId, req.body,
        {new: true},(err, user) => {
            if(err) return res.status(500).json(error);
            res.json(user);
            console.log(user);
        }
    )
}))


async function asyncForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i);
    }
}


// @route: /applicant/jobs/:id
// @desc: POST for a job Application
// @access: Private
router.post('/jobs/:id', protect(async (req, res, result) => {
    console.log(req.params.id,req.body);
    if (result.type == config.USER_RECRUITER) return res.status(403).json({error: "Forbidden"});

    const {errors, isValid} = ValidateApplication(req.body);

    if (!isValid) {
        return res.status(400).json({errors});
    }

    const jobId = req.params.id;
    const applicantId = result.id;

    const check = async () =>  {
        let ok = true;

        const jobs = await Application
            .find({applicantId: applicantId, status: "Selected"})
            .populate({path: 'jobId', select: 'duration'})
            .lean()

        let curr_time = new Date();
        await  asyncForEach(jobs, async (job) => {
            if(!ok) return;
            let startTime = job.dateofaccept;
            let jobFinishTime = new Date(startTime.setMonth(startTime.getMonth() + job.jobId.duration));
            // console.log(curr_time, jobFinishTime);
            if (curr_time <= jobFinishTime) {
                res.status(400).json({error: "You have a job running, cannot apply to this"});
                ok = false;
                return ;
            }
        })   

        console.log(ok);
        if(!ok) return;

        await Application
            .countDocuments({applicantId: applicantId, status: "Applied"}, 
                (err, count) => {
                    if ( count === 10) {
                        res.status(400).json({error: "You cannot have more than 10 open applications"});
                        ok = false;
                        return;
                    }
                })

        if(!ok) return ;

        await Application
            .countDocuments({applicantId, jobId},
                (err, count) => {
                    if (count > 0) {
                        res.status(400).json({error: "You have already applied to this job"});
                        ok = false;
                        return;
                    }
                })
            console.log(ok);
        if(!ok) return ;

        const newApplication = new Application({
            applicantId: applicantId,
            jobId: jobId,
            sop: req.body.sop
        });
    
        newApplication
            .save()
            .then(job => res.json(job))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
    check();
    console.log("applied successfully");
}))

// @route: /applicant/myapplictions
// @desc : GET applications 
// @access: Private
router.get('/myapplications', protect( async (req, res, result) => {
    if (result.type == config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    console.log(result.id);
    const applicantId = result.id;
    await Application
    .find({applicantId: applicantId})
    .lean()
    .populate({
        path: 'jobId',
        select: 'recruiterId salary title _id',
        populate: {
            path: 'recruiterId', select: 'name -_id'
        }
    })
    .exec( (error, queries) => {
        if (error) {
            console.log("ere");
            res.status(500).json(error);
            return;
        }
        apps = [];
        queries.forEach( (query) => {
            app = {}
            app.title = query.jobId.title;
            app.dateofaccept = query.dateofaccept;
            app.salary = query.jobId.salary;
            app.recruiter_name = query.jobId.recruiterId.name;;
            app.status = query.status; 
            app.jobId = query.jobId._id;
            app.rating = query.rating
            app._id = query._id
            apps.push(app);
        })
        console.log(apps);
        res.json(apps);
    })
}))

// @route: /applicant/myapplictions/rate/:id
// @desc : post add rating for job
// @access: Private
router.post('/myapplications/rate/:id', protect( async (req, res, result) => {
    if (result.type == config.USER_RECRUITER) {
        res.status(403).json({error: "Forbidden"});
        return;
    }
    const jobId = req.params.id;
    const applicantId = result.id;

    // steps 
    // 1. check if application was accepted
    // 2. already rated
    // 3. count number of people who rated
    // 4. total rating
    // 5. update rating in job
    // 6. update rating in Application

    let isAccepted = false, alreadyRated = false, id;
    await Application
        .findOne({jobId: jobId, applicantId: applicantId})
        .lean()
        .exec((error, resp) => {
            if (error) {
                res.status(500).json(error);
                return;
            }
            if(query.status === "Selected") {
                isAccepted = true;
                id = resp._id;
                if (query.rating !== -1) {
                    alreadyRated = true;
                    return;
                } 
            }
        })
    
    if(!isAccepted || alreadyRated) {
        res.status(500).json({msg: "you cannot rate this job"});
        return;
    }

    let totalPersons = 0, totalRating = 0;
    await Application
        .find({jobId, applicantId, status: "Selected"})
        .lean()
        .exec((error, resp) => {
            if (error) {
                res.status(500).json(error);
                return;
            }
            resp.forEach((r, id) => {
                if(r.rating !== -1) {
                    totalPersons += 1;
                    totalRating += r.rating;
                }
            })
        })
    
    let newRating = Math.round((totalRating + req.body.rating)/(totalPersons + 1));

    await Application
        .findByIdAndUpdate(
            id,
            {rating: req.body.rating}
        )
    
    await Job
        .findByIdAndUpdate(
            jobId,
            {rating: newRating}
        )
    
    res.json({msg: "Success"});
    
}))

router.post('/job/list', protect(async (req, res, result) => {
console.log(("hrtr"));
    if (result.type != config.USER_APPLICANT) {
        res.status(403).json({error: "Forbidden"});
        return;
    }

    const applicantId = result.id;

    const query = async()=>{
        let jobs=null
        jobs = await Job
            .find({})
            .populate('recruiterId')
            .lean()

        await asyncForEach(jobs,async(job)=>{
            console.log(job);
        })
        
        if (req.body.search && !isEmpty(req.body.search)) {
            const searcher = new FuzzySearch(jobs, ['title'], {
                caseSensitive: false,
                sort: true
            });
            jobs = searcher.search(req.body.search)
        }
      console.log(jobs);
      if(jobs===null) return res.status(400).json({error:"Not found"})
      res.json(jobs)
    }
    query();
}))

router.post("/application/rate/job", protect((req, res, result) => {
    if (result.type == config.USER_RECRUITER) {
        res.status(403).json({
            error: "Forbidden"
        });
        return;
    }

    if (!req.body.orderId || isEmpty(req.body.orderId)) {
        res.status(401).json({
            jobRating: "Order ID missing"
        });
        return;
    }

    if (!req.body.jobRating || isEmpty(req.body.jobRating)) {
        res.status(401).json({
            jobRating: "Rating cannot be empty"
        });
        return;
    }

    let jobRating = parseInt(req.body.jobRating);
    if (!Number.isInteger(jobRating) || jobRating < 1 || jobRating > 5) {
        res.status(401).json({
            jobRating: "Rating must be between 1 and 5"
        });
    }

    if (!req.body.jobReview || isEmpty(req.body.jobReview)) {
        res.status(401).json({
            jobReview: "Review cannot be empty"
        });
        return;
    }

    Application.findOne({"_id": req.body.orderId}, (error, query) => {
        if (!error) {
            if (query == null) {
                res.status(401).json({jobRating: "Order ID does not exist"});
                return;
            }

            query.rating = jobRating;
            query.review = req.body.jobReview;
            query.save();
            console.log("test")
            res.end();
        }
    });


}));

module.exports = router;