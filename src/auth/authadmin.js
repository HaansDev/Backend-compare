const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config");
const Admin = require("../models/admin");

passport.use(
  "authadmin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    },
    async (payload, done) => {
      try {
        const admin = await Admin.findById(payload.sub);
        if (!admin) {
          return done(null, false);
        }
        done(null, admin);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

const authadmin = passport.authenticate("authadmin", {
  session: false,
})

module.exports = { authadmin }