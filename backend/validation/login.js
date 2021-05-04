const Validator = require("validator");
const isEmpty = require("is-empty");

const ValidateLoginInput = (body)=>{
    let errors = {};
    
    body.email = isEmpty(body.email) ? "" : body.email    
    
    if (Validator.isEmpty(body.email)) {
        errors.email = "Please enter email address";
    } else if (!Validator.isEmail(body.email)) {
        errors.email = "Invalid email address";
    }
    
    body.password = isEmpty(body.password) ? "" : body.password
    if (Validator.isEmpty(body.password)) {
        errors.password = "Please enter password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
module.exports = ValidateLoginInput 