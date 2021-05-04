const config = require("./config")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Applicant = require("./models/applicant");
const Recruiter = require("./models/recruiter");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSECRET;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            //applicant
            Applicant.findById(jwt_payload.id)
                .then(applicant => {
                    if (applicant) {
                        return done(null, applicant);
                    }
                })
                .catch(err => console.log(err));
                //recruiter
            Recruiter.findById(jwt_payload.id)
                .then(recruiter => {
                    if (recruiter) return done(null, recruiter);
                })
                .catch(err => console.log(err));
            return done(null, false)
        })
    );
};