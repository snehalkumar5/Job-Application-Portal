const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conf = require("../config")

const Recruiter = require("../models/recruiter")
const Applicant = require("../models/applicant");
const ValidateRegisterRecruiter = require("../validation/registerRecruiter");
const ValidateRegisterApplicant = require("../validation/registerApplicant");
const ValidateLoginInput = require("../validation/login");

const router = express.Router();

// @route POST auth/register/recruiter
// @desc Register recruiter
// @access Public
router.post("/register/recruiter", (req, res) => {
    
    console.log(req)
    const {errors, isValid} = ValidateRegisterRecruiter(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {name,email,password} = req.body
    // check already exists and if not, create
    Recruiter.findOne({email}).then(recruit => {
        if (recruit) return res.status(400).json({email: "User with email already exists"});

        const newRecruiter = new Recruiter({
            name,
            email,
            password
        });
        // if(bio) newRecruiter.bio = bio;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newRecruiter.password, salt, (err, hash) => {
                if (err) throw err;
                newRecruiter.password = hash;
                newRecruiter
                    .save()
                    .then(recruit => res.json(recruit))
                    .catch(err => console.log(err));
            });
        });
    });
});


// @route POST auth/register/applicant
// @desc Register applicant
// @access Public
router.post("/register/applicant", (req, res) => {

    const {errors,isValid} = ValidateRegisterApplicant(req.body);

    console.log(req.body.skills);
    if (!isValid) return res.status(400).json(errors);

    const {name,email,password, education} = req.body
    Applicant.findOne({email}).then(applicant => {
        if (applicant) return res.status(400).json({ email: "User with email already exists" })
        
        const newApplicant = new Applicant({
            name,
            email,
            password,
        });
        if(education) newApplicant.education = education;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newApplicant.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                newApplicant.password = hash;
                newApplicant
                    .save()
                    .then(applicant => res.json(applicant))
                    .catch(err => console.log(err));
            });
        });
    });
});

function userFound(type, password, user, res) {
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // user authenticated
            const jwtPayload = {
                id: user.id,
                name: user.name,
                type: type
            };
            jwt.sign(jwtPayload, conf.jwtSECRET, {
                    expiresIn: 100000
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                });
        } else {
            res.status(400).json({
                password: "Incorrect password"
            })
        }
    });
}

// login route
// @route POST auth/login
// @desc Login and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // check validation
    const {errors, isValid} = ValidateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const {email,password} = req.body

    Recruiter.findOne({email}).then((user) => {
       if (!user) {
           Applicant.findOne({email}).then((user2) => {
               if (user2) {
                   userFound(conf.USER_APPLICANT, password, user2, res);
               } else {
                   res.status(404).json({
                       email: "Not found"
                   });
               }
           });
       } else {
           userFound(conf.USER_RECRUITER, password, user, res);
       }
   });
    
});

module.exports = router