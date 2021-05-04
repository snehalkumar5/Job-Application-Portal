const Validator = require("validator");
const isEmpty = require("is-empty");

const ValidateRegisterRecruiter = (body) => {
    const errors = {};

    body.name = isEmpty(body.name) ? "" : body.name
    if (Validator.isEmpty(body.name)) {
        errors.name = "Name field required";
    }
    
    body.email = isEmpty(body.email) ?  "" :body.email 
    if (Validator.isEmpty(body.email)) {
        errors.email = "Email field required";
    } else if (!Validator.isEmail(body.email)) {
        errors.email = "Invalid email address";
    }

    // body.contact = isEmpty(body.contact) ? "" : body.contact.toString() 
    // if (Validator.isEmpty(body.contact)) {
    //     errors.contact = "Contact field required";
    // } else if (!Validator.isMobilePhone(body.contact, "en-IN")){
    //     errors.contact = "Enter valid Indian phone number";
    // }

    body.password = isEmpty(body.password) ?  "" : body.password
    if (Validator.isEmpty(body.password)) {
        errors.password = "Password field required";
    }
    
    if (!Validator.isLength(body.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password should be between 6 and 30 characters";
    }
    body.password2 = isEmpty(body.password2) ? "" :  body.password2
    if (Validator.isEmpty(body.password2)) {
        errors.password2 = "Confirm password required";
    }

    if (!Validator.equals(body.password, body.password2)) {
        errors.password2 = "Password does not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
module.exports = ValidateRegisterRecruiter
