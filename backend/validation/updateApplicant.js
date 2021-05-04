const Validator = require('validator')
const isEmpty = require('is-empty')

const ValidateUpdateApplicant = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name.toString() : ""
    data.email = !isEmpty(data.email) ? data.email.toString() : ""

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
        }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    data.Education && data.Education.forEach((item, index) => {
        data.Education[index].name = !isEmpty(data.Education[index].name) ? data.Education[index].name : ""
        data.Education[index].startyear = !isEmpty(data.Education[index].startyear) ? data.Education[index].startyear.toString().substring(0,4) : ""
        data.Education[index].endyear = !isEmpty(data.Education[index].endyear) ? data.Education[index].endyear.toString().substring(0,4) : ""
    })


    data.Education && data.Education.forEach((item, id) => {
        let education_error = {}
        let isError = false;
        if(Validator.isEmpty(item.name)) {
            education_error.name = "Education name field is not there"
            isError = true;
        }
        if(Validator.isEmpty(item.startyear)) {
            education_error.startyear = "Education start year field is not there"
            isError = true;
        } else if (!Validator.isInt(item.startyear)) {
        education_error.startyear = "Education start year field is not a valid year"
        isError = true;
        }
        if(!Validator.isEmpty(item.endyear) && !Validator.isInt(item.endyear)) {
        education_error.endyear = "Education end year field is not a valid year"
        isError = true;
        }
        if(isError === true) {
        if(!("education" in errors)) errors.education = {}
        errors.education[id] = education_error;
        }
    })
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = ValidateUpdateApplicant