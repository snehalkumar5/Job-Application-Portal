const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const bcrypt = require("bcryptjs");
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const Application = require('../models/application')

// @route GET application/
// @desc Get all items
// @access Public
router.get('/',(req,res)=>{
    Application.find()
    .sort({date:-1})
    .then(applications=>res.json(applications))
})

// @route POST application/
// @desc Make a post
// @access Public
router.post('/',(req,res)=>{
    const {} = req.body;
    const newApplication = new Application({
        name: req.body.name,
        education: req.body.education,
        email: req.body.email,
        password: req.body.password,
        skills: req.body.skills,
        rating: req.body.rating

    })

    newApplication.save().then(application=>res.json(application))
})
// @route PUT Application/edit/:id
// @desc Edit job
// @access Private
router.put('/edit/:id',auth, (req,res,next)=>{
    Application.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(()=>{
        Application.findOne({ _id: req.params.id }).then(user=>res.send(user))
})
})
// @route DELETE Application/:id
// @desc Delete
// @access Public

router.delete('/:id',(req,res)=>{
    Application.findById(req.params.id)
    .then(Application=>Application.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}))
})


module.exports = router

