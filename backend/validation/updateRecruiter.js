const Validator = require('validator')
const isEmpty = require('is-empty')

const ValidateUpdateRecruiter = (data) => {
    let errors = {};
    data.name = isEmpty(data.name) ? "" : data.name.toString() 
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field required";
    }

    data.email = isEmpty(data.email) ? "" : data.email.toString() 
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
  
    data.contact = isEmpty(data.contact) ? "" : data.contact.toString() 
    if (!isEmpty(data.contact) && !Validator.isInt(data.contact)) {
        errors.contact = "Contact should be valid number required";
    }

    data.bio = isEmpty(data.bio) ? "" : data.bio.toString() 
        
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = ValidateUpdateRecruiter