const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Job = require('../models/job')


// @route GET job/
// @desc Get all jobs
// @access Public
router.get('/',(req,res)=>{
    Job.find()
    .sort({date:-1})
    .then(job=>res.json(job))
})

// @route GET job/:id
// @desc Get one job details
// @access Public
router.get('/:id',(req,res)=>{
    Job.findById(req.params.id)
    .sort({date:-1})
    .then(job=>res.json(job))
})

// @route POST job/create
// @desc Create a job
// @access Public
router.post('/create',(req,res)=>{
    const { title, applications,deadline, positions, type} = req.body;

    const newJob = new Job({
        title,
        applications,
        deadline,
        positions,
        // skills,
        type,
        // duration,
        // salary,
        // rating
    })
    newJob.save().then(job=>res.json(job))
})

// @route PUT job/edit/:id
// @desc Edit job
// @access Private
router.put('/edit/:id',auth,(req,res,next)=>{
    Job.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(()=>{
        Job.findOne({ _id: req.params.id }).then(job=>res.send(job))
})
})

// @route DELETE job/:id
// @desc Delete job
// @access Public
router.delete('/:id',(req,res)=>{
    Job.findById(req.params.id)
    .then(job=>job.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}))
})

module.exports = router

