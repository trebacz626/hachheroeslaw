import express = require('express');
import sequelizeManager from '../../db/model/sequelizeManager';
import errorObjectsLevel from '../../utils/errors/errorObjectsLevel';
import { Authenticator, PassportStatic } from 'passport';
import { passportNames, isLoggedIn, accessLevels } from '../../utils/passport/auth';
import { validateRegisterRequest, validateLoginRequest, validateSetName, validateClaimUploader } from '../validators/authenticateValidator';
import { IUserInstance } from '../../db/model/User';
import { globalUserService } from '../../db/services/UserService';
import Name, { NameTypes } from '../../utils/random name generator/Name';
import errorObjectsUser from '../../utils/errors/errorObjectsUser';
import errorObjectsUploader from '../../utils/errors/errorObjectsUploader';
import { processErrors } from '../middlewares';
import { globalLawService } from '../../db/services/LawService';
import { ILawInstance } from '../../db/model/Law';
import { globalVoteService } from '../../db/services/VoteService';
import DbService from '../../db/services/dbService';
import { IVoteInstance } from '../../db/model/Vote';
const { validationResult } = require('express-validator/check');

const getLawById = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    let laws;
    if(!req.user)   
      laws =await globalLawService.getLawById(req.params.id);
    else
      laws = await globalLawService.getLawByIdIncludingVote(req.params.id,req.user.id);
    res.json(laws);
  } catch (err) {
    next(err);
  }
}

const getAllLaws = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    res.json(await globalLawService.getAllLaws());
  } catch (err) {
    next(err);
  }

}


const getLawsByPage = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    if(req.user)var id=req.user.id;
    res.json(await globalLawService.getLawsByPage(req.params.num,id));
  } catch (err) {
    next(err);
  }


}

const getLawsByPageAndStatus = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    if(req.user)var id=req.user.id;
    res.json(await globalLawService.getLawsByPage(req.params.num,id,req.params.status));
  } catch (err) {
    next(err);
  }


}
const voteForLaw = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    var isUp=req.params.upordown==="up";
    var law:ILawInstance = await globalLawService.getLawById(req.params.id);
    if(law===null){next({error:"Law doesn't exist"});return;}
    var vote:IVoteInstance = await globalVoteService.getVote({userId:req.user.id,lawId:req.params.id});
    if(vote===null){
      vote=await globalVoteService.createVote({userId:req.user.id,lawId:req.params.id,isUp:isUp});
      if(vote.isUp)
        law.votesUp+=1;
      else
        law.votesDown-=1;
      await law.save();
    }else{
      if(vote.isUp!==isUp){
        vote.isUp=isUp;
        await vote.save();
        if(vote.isUp){
          law.votesUp+=1;
          law.votesDown-=1;
        }else{
          law.votesUp-=1;
          law.votesDown+=1;
        }
        await law.save();
      }
    }
    res.json({
      vote:vote,
      law:law
    });
  } catch (err) {
    next(err);
  }

}

const disableVoteForLaw = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  
  try {
    var law:ILawInstance = await globalLawService.getLawById(req.params.id);
    if(law===null){next({error:"Law doesn't exist",status:400});return;}
    var vote:IVoteInstance = await globalVoteService.getVote({userId:req.user.id,lawId:req.params.id});
    if(vote!==null){
      if(vote.isUp)
        law.votesUp--;
      else
        law.votesDown--;
      await globalVoteService.deleteVoteById(vote);
      law.save();
    }else{
      next({error:"you haven't voted",status:400});return;
    }
    res.json({message:"disabled"});
    
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
  router.get('/laws/all',isLoggedIn(accessLevels.USER), processErrors, getAllLaws);
  router.get('/laws/page/:num',isLoggedIn(accessLevels.GUEST), processErrors, getLawsByPage);
  router.get('/laws/page/:num/:status',isLoggedIn(accessLevels.GUEST), processErrors, getLawsByPageAndStatus);
  router.post("/laws/:id/vote/disable",isLoggedIn(accessLevels.USER),disableVoteForLaw);
  router.post("/laws/:id/vote/:upordown",isLoggedIn(accessLevels.USER),voteForLaw);
  router.get('/laws/:id',isLoggedIn(accessLevels.GUEST), processErrors, getLawById);
  
}