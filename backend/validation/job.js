const Validator = require("validator");
const isEmpty = require("is-empty");
var validateDate = require("validate-date");

const ValidateJobInput=(job)=>{
    let errors = {};
    
    job.title = isEmpty(job.title) ? "" : job.title
    if (Validator.isEmpty(job.title)) {
        errors.title = "Enter job name";
    }

    job.type = isEmpty(job.type) ? "" : job.type
    if (Validator.isEmpty(job.type)) {
        errors.type = "Job type required";
    } 

    job.skills = isEmpty(job.skills) ? "" : job.skills
    if (isEmpty(job.skills)) {
        errors.skills = "Skills field required";
    }
    
    job.duration = isEmpty(job.duration) ? "" : job.duration
    if (Validator.isEmpty(job.duration)) {
        errors.duration = "Duration field required";
    }else if (!Validator.isInt(job.duration, {min: 0, max:6})) {
        errors.duration = "Duration between 0 and 6 only"
    }

    job.positions = isEmpty(job.positions) ? "" : job.positions
    if (Validator.isEmpty(job.positions)) {
        errors.positions = "Positions field required";
    } else if (!Validator.isInt(job.positions, {min: 1})) {
        errors.positions = "Positions to be a number greater than 0"
    }
    
    job.applications = isEmpty(job.applications) ? "" : job.applications
    if (Validator.isEmpty(job.applications)) {
        errors.applications = "Application field required";
    } else if (!Validator.isInt(job.applications, {min: 1})) {
        errors.applications = "Applications to be a number greater than 0"
    }
    
    job.deadline = isEmpty(job.deadline) ? "" : job.deadline
    if (Validator.isEmpty(job.deadline)) {
        errors.deadline = "Deadline field required";
    } else if(!Validator.isDate(job.deadline)){
        errors.deadline = "Inavlid date"
    }
    
    job.salary = isEmpty(job.salary) ? "" : job.salary
    if (Validator.isEmpty(job.salary)) {
        errors.salary = "Salary field required";
    } else if (!Validator.isInt(job.salary, {min: 0})) {
        errors.salary = "Salary cannot be a negative number"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
module.exports = ValidateJobInput