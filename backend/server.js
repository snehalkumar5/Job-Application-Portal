const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 4000;
const DB_NAME = "portal"
const passport = require("passport");
const config = require('./config')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = config.MONGO_URI
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false })
    .then(()=> console.log('MongoDB Connected..'))
    .catch(err=>console.log(err))

app.use(passport.initialize());
require("./passport-conf")(passport);

app.use("/auth", require('./routes/auth'));
app.use("/recruiter", require('./routes/recruiter'));
app.use("/applicant", require('./routes/applicant'));


app.listen(port,()=>console.log(`Server started on ${port}`))