import express = require('express');
import sequelizeManager from '../../db/model/sequelizeManager';
import { Authenticator, PassportStatic } from 'passport';
import { passportNames, isLoggedIn, accessLevels, generateAccessToken } from '../../utils/passport/auth';
import { validateRegisterRequest, validateLoginRequest, validateRefreshTokenRequest } from '../validators/authenticateValidator';
import { IUserInstance } from '../../db/model/User';
import { globalUserService } from '../../db/services/UserService';
import Name, { NameTypes } from '../../utils/random name generator/Name';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';
import { processErrors } from '../middlewares';
const { validationResult } = require('express-validator/check');


//it just returns user
const register = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log("body");
  console.log(req.body)
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
}

//it just returns user
const login = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
}

//it just returns user with uploaders
const getCurrentUser = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
}

const refreshAccessToken = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    console.log(req.body);
    var user = await globalUserService.findUserByRefreshToken(req.body.refreshToken);
    if(user ===null)next("User doesn't exist");
    res.json({
      accessToken:await generateAccessToken(user.id)
    });
  } catch (err) {
    next(err);
  }
}

const logOut = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    req.logout();
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export default function (router: express.Router, passport: PassportStatic) {
  router.post('/authentication/register',function(req,res,next){console.log(req.body);next();}, validateRegisterRequest(), processErrors, passport.authenticate(passportNames.LOCAL_SIGN_UP,{ session: false }), register);
  router.post('/authentication/login', validateLoginRequest(), processErrors, passport.authenticate(passportNames.LOCAL_LOGIN,{ session: false }), login);
  router.get('/authentication/currentuser', isLoggedIn(accessLevels.USER), getCurrentUser);

  router.post('/authentication/refreshaccessToken',validateRefreshTokenRequest(),  refreshAccessToken);
   
}