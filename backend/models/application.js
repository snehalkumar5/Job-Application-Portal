const mongoose = require('mongoose')
const job = require('./job')
const recruiter = require('./recruiter')
const applicant = require('./applicant')
const Schema = mongoose.Schema
const stat = ["Applied","Waiting","Selected","Rejected"]

const ApplicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'applicant',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    dateofaccept: {
        type: Date,
        default: "9999-12-31"
    },
    status: {
        type: String,
        required: true,
        enum: stat,
        default: "Applied"
    },
    rating: {
        type: Number,
        default: -1
    },
    applicant_rating: {
        type: Number,
        default: -1
    },
    resume: {
        type: String,
    },
    image:{
        type: String,
        default:"default.img"
    },
    sop: {
        type: String,
        required: true
    }
})

module.exports = Application = mongoose.model('application', ApplicationSchema)