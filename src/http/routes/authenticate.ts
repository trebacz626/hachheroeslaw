import express = require('express');
import sequelizeManager from '../../db/model/sequelizeManager';
import errorObjectsLevel from '../../utils/errors/errorObjectsLevel';
import { Authenticator, PassportStatic } from 'passport';
import { passportNames, isLoggedIn, accessLevels, generateAccessToken } from '../../utils/passport/auth';
import { validateRegisterRequest, validateLoginRequest, validateSetName, validateClaimUploader } from '../validators/authenticateValidator';
import { IUserInstance } from '../../db/model/User';
import { globalUserService } from '../../db/services/UserService';
import Name, { NameTypes } from '../../utils/random name generator/Name';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';
import errorObjectsUploader from '../../utils/errors/errorObjectsUploader';
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
  /**
   * @api {post} /Account/register register
   * 
   * @apiName register
   * @apiGroup Authenticate
   * 
   * @apiParam {String} Email 
   * @apiParam {String} Password 
   * 
   * @apiSuccess {json} userObj json
   * @apiSuccessExample Success-Response
   * {
    "id": "0271bdbb-71f3-471b-9ebd-4e456deb6384",
    "email": "tom@superhotgame.com",
    "emailConfirmed": false,
    "passwordHash": "AFJaPVWfd598LhCJ/lcAgS+TWBd6xP03hopdUGAvSbt3sRkM/t+zt7IsfiC1lT1qpQ==",
    "securityStamp": "54eccb29-03b0-4848-b763-25d177f1467e",
    "phoneNumber": null,
    "phoneNumberConfirmed": false,
    "twoFactorEnabled": false,
    "lockoutEndDateUtc": null,
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "userName": "tom@superhotgame.com",
    "customName": "tom",
    "isSuperadmin": true
}
   * 
   * 
   * @apiUse invalidUsernameOrPassword
   * @apiUse couldntCreateUser
   * @apiUse userAlreadyExists
  */
  router.post('/authentication/register', validateRegisterRequest(), processErrors, passport.authenticate(passportNames.LOCAL_SIGN_UP,{ session: false }), register);
  /**
   * @api {post} /Account/login login
   * 
   * @apiName login
   * @apiGroup Authenticate
   * 
   * @apiParam {String} Email 
   * @apiParam {String} Password 
   * 
   * @apiSuccess {json} userObj json
   * @apiSuccessExample Success-Response
   * {
    "id": "0271bdbb-71f3-471b-9ebd-4e456deb6384",
    "email": "tom@superhotgame.com",
    "emailConfirmed": false,
    "passwordHash": "AFJaPVWfd598LhCJ/lcAgS+TWBd6xP03hopdUGAvSbt3sRkM/t+zt7IsfiC1lT1qpQ==",
    "securityStamp": "54eccb29-03b0-4848-b763-25d177f1467e",
    "phoneNumber": null,
    "phoneNumberConfirmed": false,
    "twoFactorEnabled": false,
    "lockoutEndDateUtc": null,
    "lockoutEnabled": true,
    "accessFailedCount": 0,
    "userName": "tom@superhotgame.com",
    "customName": "tom",
    "isSuperadmin": true
}
   * 
   * 
   * @apiUse invalidUsernameOrPassword
   * 
   * 
  */
  router.post('/authentication/login', validateLoginRequest(), processErrors, passport.authenticate(passportNames.LOCAL_LOGIN,{ session: false }), login);
  /**
   * @api {get} /Account/currentUser current user
   * 
   * @apiName currentUser
   * @apiGroup Authenticate
   * 
   * @apiSuccess {json} userObj json
   * @apiSuccessExample Success-Response
   * {"id":"0271bdbb-71f3-471b-9ebd-4e456deb6384","email":"tom@superhotgame.com","emailConfirmed":false,"passwordHash":"AFJaPVWfd598LhCJ/lcAgS+TWBd6xP03hopdUGAvSbt3sRkM/t+zt7IsfiC1lT1qpQ==","securityStamp":"54eccb29-03b0-4848-b763-25d177f1467e","phoneNumber":null,"phoneNumberConfirmed":false,"twoFactorEnabled":false,"lockoutEndDateUtc":null,"lockoutEnabled":true,"accessFailedCount":0,"userName":"tom@superhotgame.com","customName":"tom","isSuperadmin":true,"Uploaders":[{"id":9,"uploaderFingerprint":"TOM-PC-Tomasz","friendlyHandle":"StupidRoseKinkajou","registeredUserId":"0271bdbb-71f3-471b-9ebd-4e456deb6384","claimToken":"161FED65-394C-4AD8-B863-43D9A6006FC2","customName":"tom","lockedOutOfDiscount":false,"claimedDiscountId":3,"created":null,"discountClaimToken":"73A70CF8556B","discountClaimTokenGenerated":"2016-02-25T15:25:09.740Z","registeredUser_Id":"0271bdbb-71f3-471b-9ebd-4e456deb6384"}]}
   * 
   * @apiUse userFromSessionDoesntexists
  */
  router.get('/authentication/currentuser', isLoggedIn(accessLevels.USER), getCurrentUser);

  router.post('/authentication/refreshaccessToken',  refreshAccessToken);
   
}