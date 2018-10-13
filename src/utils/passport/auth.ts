//passport configuration
import * as Passport from 'passport'
import * as LocalStrategy from 'passport-local'
//import DB from '../../model/db/DB'
import * as express from 'express'
import { IUserInstance } from '../../db/model/User';
import { globalUserService } from '../../db/services/UserService'
import * as hasher from '../hasher'
import errorObjectsUser from '../errors/errorObjectsUser';
import errorObjectsGlobal from '../errors/errorObjectsGlobal';
import JWT from '../../utils/passport/JWTPromise'
import config from '../../configuration/main'
import * as crypto from 'crypto'

const createSignUpStrategy = (passport: Passport.Authenticator) => {
  passport.use(passportNames.LOCAL_SIGN_UP, new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
    async function (req: express.Request, email: string, password: string, done) {
      console.log("registering")
      let user: IUserInstance = await globalUserService.findUserByEmail(email);
      if (user === null) {
        var hash: string = await hasher.hashPassword(password);
        user = await globalUserService.createUser({ passwordHash: hash, email: email,name:req.body.name });
        var refreshToken = user.id.toString() + '.' + crypto.randomBytes(40).toString('hex');
        user.refreshToken=refreshToken;
        await user.save();
        console.log(user);
        if (user === null) return done(errorObjectsUser.couldntCreateUser,false);
        return done(null,user);
      }
      return done(errorObjectsUser.userAlreadyExists,false);
    }
));
}

const createSignInStrategy = (passport: Passport.Authenticator) => {
  passport.use(passportNames.LOCAL_LOGIN, new LocalStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback:true
  },
    async function (req: express.Request, email: string, password: string, done) {
      let user: IUserInstance = await globalUserService.findUserByEmail(email);
      if (user === null) return done(errorObjectsUser.invalidUsernameOrPassword);
      if (!hasher.isValid(password, user.passwordHash)) return done(errorObjectsUser.invalidUsernameOrPassword);
      return done(null, user);
    }
  ));
}

/*const serializeUser = (passport: Passport.Authenticator) => {
  passport.serializeUser(function (user: IUserInstance, cb) {
    return cb(null, user.id);
  });
}

const deserializeUser = (passport: Passport.Authenticator) => {
  passport.deserializeUser(async function (id: string, cb) {
    let user: IUserInstance = await globalUserService.getUserByIdWithUploaders(id);
    if (user === null) return cb(errorObjectsUser.userFromSessionDoesntexists);
    return cb(null,user);
  });
}*/

export function setup(passport) {
  createSignUpStrategy(passport);
  createSignInStrategy(passport);
  //serializeUser(passport);
  //deserializeUser(passport);

}


/*export const isLoggedIn = function (req: express.Request, res: express.Response, next) {
  if (req.isAuthenticated())
    return next();
  res.json();//it's empty because frontend expected empty message if user is not logged, should return error for new frontend
}*/

export const isLoggedIn = function(minAccessLevel){
  return async function (req: express.Request, res: express.Response, next) {
    console.log("is");
    if(req.headers.access_token){
      try{var data = await JWT.verify((<string>req.headers.access_token));}catch(err){res.json("Invalid accessToken")}

      req.user=await globalUserService.getUserById(<number>data['id']);
      next();
    }else{
      if(minAccessLevel>accessLevels.GUEST)
        res.json({error:"No access Token"})
      else 
        next();
    }
  }
}

export async function generateAccessToken(id:number){
  return await JWT.sign({id:id});
}

export const passportNames = {
  LOCAL_SIGN_UP: "LOCAL_SIGN_UP",
  LOCAL_LOGIN:"local-login"
}

export const accessLevels={
  GUEST:0,
  USER:1
}