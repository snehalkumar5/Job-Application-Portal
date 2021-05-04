const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EducationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startyear: {
        type: Date,
        required: true
    },
    endyear: {
        type: Date
    }
})

module.exports = Education = mongoose.model('Education', EducationSchema)