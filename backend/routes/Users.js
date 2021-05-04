// var express = require("express");
// var router = express.Router();
// const bcrypt = require("bcryptjs");
// const config = require('config')
// const jwt = require('jsonwebtoken')
// const auth = require('../middleware/auth')
// // Load User model
// const User = require("../models/user");

// // GET request 
// // Getting all the users
// router.get("/", function(req, res) {
//     User.find(function(err, users) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(users);
// 		}
// 	})
// });

// router.post("/register", function(req, res) {
//    const { name, email, password } = req.body;

//    if(!name || !email || !password){
//        return res.status(400).json({msg:'Please enter all fields'})
//    }

//    User.findOne({ email })
//    .then(user =>{
//        if(user) return res.status(400).json({msg:' User already exists'})

//        const newUser = new User ({
//            name,
//            email,
//            password
//        });
       
//        // Create salt and hash
//        bcrypt.genSalt(10,(err,salt)=> {
//            bcrypt.hash(newUser.password, salt, (err,hash)=>{
//                if(err) throw err;
//                newUser.password = hash;
//                newUser.save()
//                .then(user=>{
//                     jwt.sign(
//                         { id: user.id },
//                         config.get('jwtSecret'),
//                         { expiresIn: 3600 },
//                         (err,token)=>{
//                             if(err) throw err;
//                             res.status(200).json({
//                                 token,
//                                 user: {
//                                    id: user.id,
//                                    name: user.name,
//                                    email: user.email
//                                 }
//                             }); 
//                         }
//                     )
//                })
//            })
//        })
//    })
// });


// // NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// // POST request 
// // Add a user to db
// // router.post("/register", (req, res) => {
// //     const newUser = new User({
// //         name: req.body.name,
// //         email: req.body.email,
// //         date: req.body.date
// //     });

// //     newUser.save()
// //         .then(user => {
// //             res.status(200).json(user);
// //         })
// //         .catch(err => {
// //             res.status(400).send(err);
// //         });
// // });

// // POST request 
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });
// // user/:id
// router.delete('/:id',auth, (req,res)=>{
//     Applicant.findById(req.params.id)
//     .then(applicant=>applicant.remove().then(()=>res.json({success:true})))
//     .catch(err=>res.status(404).json({success:false}))
// })

// module.exports = router;

