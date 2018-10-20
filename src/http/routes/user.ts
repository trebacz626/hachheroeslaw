import express = require('express');
import sequelizeManager from '../../db/model/sequelizeManager';
import { Authenticator, PassportStatic } from 'passport';
import { passportNames, isLoggedIn, accessLevels } from '../../utils/passport/auth';
import { validateGetById } from '../validators/userValidator';
import { IUserInstance } from '../../db/model/User';
import { globalUserService } from '../../db/services/UserService';
import Name, { NameTypes } from '../../utils/random name generator/Name';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';
import { processErrors } from '../middlewares';
import { globalVoteService } from '../../db/services/VoteService';
import { globalLawService } from '../../db/services/LawService';
const { validationResult } = require('express-validator/check');

//it just returns user with uploaders
const getUserById = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    let user =await globalUserService.getUserById(req.params.id)
    user.refreshToken="I isn't so easy";
    res.json(user);
  } catch (err) {
    next(err);
  }
}

const getUsersVotes = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    res.json(await globalLawService.getAllLawsWithUsersVotes(req.user));
  } catch (err) {
    next(err);
  }
}


export default function (router: express.Router) {
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
  router.get('/user/getmyvotes',isLoggedIn(accessLevels.USER), getUsersVotes);
  router.get('/user/:id',validateGetById(), processErrors, getUserById);
  
  
}