module.exports = {
    MONGO_URI: "mongodb+srv://tempuser:testing123@cluster0.2m128.mongodb.net/test?retryWrites=true&w=majority",
    jwtSECRET: "app_mysecret",
    EXPRESS_PORT: 4000,
    
    USER_APPLICANT: 0,
    USER_RECRUITER:1,
    TOKEN_EXPIRY: 31556926, // 1 year in seconds
};