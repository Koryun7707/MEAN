const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = '12345';

const option = {
        clientID:716612055564582,
        clientSecret:'f9d00798bb233f2906ca19dc528d4a3a',
        callbackURL:"http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']

    };
const Option = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secret
}
module.exports = passport => {
    passport.use(
        new JwtStrategy(Option ,async (payload ,done) =>{
            try {
                const user = await User.findById(payload.userId).select(`email id`)
                if(user) {
                    done(null,user)
                } else {
                    done(null,false)
                }
            } catch(error) {
                console.log()
            }

        })
    )
}
// module.exports =  (passport) =>{
//     console.log('Passport js')
//     var token
//     passport.serializeUser( async (user,done)=>{
//         // console.log(user)
//
//         done(null,user.email)
//     })
//     passport.deserializeUser((id,done)=>{
//         // console.log(id)
//         User.find(id,(err,user)=>{
//             done(err,user)
//         })
//     })
//     passport.use(new FacebookStrategy(option,
//          ( async(accessToken ,refreshToken ,profile ,done) =>{
//            const newUser = new User({
//                name:profile._json.name.split(' ')[0],
//                surname:profile._json.name.split(' ')[1],
//                email:profile._json.email,
//                role:'fb_user'
//            })
//            try{
//                const user =  await User.findOne({email:profile._json.email}).lean();
//                if(user)
//                return done(null,user)
//                await newUser.save()
//                done(null,newUser)
//
//            } catch (error) {
//                console.log('error')
//                 done(error,newUser)
//            }
//
//         })
//         ));
//
// }
