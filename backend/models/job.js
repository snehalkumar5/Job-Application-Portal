const mongoose = require('mongoose')
const recuiter = require('./recruiter')
const Schema = mongoose.Schema
const stat = ["Apply","Rejected","Full"]

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: 'recruiter',
        required: true
    },
    applications: {
        type: Number,
        required: true
    },
    positions: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ["Part Time","Work from Home","Full Time"],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    status: {
        type: String,
        enum: stat,
        required: true 
    }
})

module.exports = Job = mongoose.model('job', JobSchema)