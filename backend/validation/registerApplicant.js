const Validator = require("validator");
const isEmpty = require("is-empty");

const ValidateRegisterApplicant = (body) => {
    let errors = {};

    // convert empty fields to empty strings so we can use validator
    body.name = isEmpty(body.name) ? "" : body.name
    
    if (Validator.isEmpty(body.name)) {
        errors.name = "We'd love to know your name!";
    }
    
    body.email = isEmpty(body.email) ?  "" :body.email 
    if (Validator.isEmpty(body.email)) {
        errors.email = "We'll need your email, please?";
    } else if (!Validator.isEmail(body.email)) {
        errors.email = "Invalid email address";
    }
    
    body.password = isEmpty(body.password) ?  "" : body.password
    if (Validator.isEmpty(body.password)) {
        errors.password = "We know it's a secret, but you can let us in on it!";
    }
    
    if (!Validator.isLength(body.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password should be between 6 and 30 characters";
    }
    body.password2 = isEmpty(body.password2) ? "" :  body.password2
    if (Validator.isEmpty(body.password2)) {
        errors.password2 = "This has to be the same as that.";
    }

    if (!Validator.equals(body.password, body.password2)) {
        errors.password2 = "Password does not match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = ValidateRegisterApplicant;
