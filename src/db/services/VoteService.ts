import * as Sequelize from "sequelize";
1
import * as VoteModel from './../../db/model/Vote';
import * as LawModel from './../../db/model/Law';
import { IVoteInstance, IVoteAttributes } from "./../../db/model/Vote";
import DbService from "./dbService";
import { IUserAttributes } from "../model/User";

export default class UserService extends DbService {
  setTransaction(transaction: Sequelize.Transaction) {
    this.transaction = transaction;
  }
  async getVote(vote:IVoteAttributes) {
    let options: Sequelize.FindOptions<IVoteAttributes> = {
      where:{
        userId:vote.userId,
        lawId:vote.lawId
      },
      transaction: this.transaction
    }
    return await VoteModel.model.findOne(options);
  }
  
  async deleteVoteById(vote:IVoteInstance) {
    let options: Sequelize.DestroyOptions = {
      where:{
        userId:vote.userId,
        lawId:vote.lawId
      },
      transaction: this.transaction
    }
    return await VoteModel.model.destroy(options);
  }
  async updateVote(vote: IVoteInstance, fields: IVoteAttributes) {
    let options: Sequelize.UpdateOptions = {
      where:{
        userId:vote.userId,
        lawId:vote.lawId
      },
      transaction: this.transaction
    }
    return await VoteModel.model.update(fields, options);
  }

  async createVote(vote: IVoteAttributes) {
    let options: Sequelize.CreateOptions = {
      transaction: this.transaction
    }
    return await VoteModel.model.create(vote, options);
  }

  async getAllVotes(){
    let options: Sequelize.FindOptions<IVoteAttributes> = {
      transaction: this.transaction
    }
    return await VoteModel.model.findAll(options);
  }

  async getVoteForUserIncludingLaws(user:IUserAttributes) {
    let options: Sequelize.FindOptions<IVoteAttributes> = {
      where:{
        userId:user.id,
      },
      include:[
        {model:LawModel.model,required:true}
      ],
      transaction: this.transaction
    }
    return await VoteModel.model.findAll(options);
  }


 
}

export const globalVoteService = new UserService();