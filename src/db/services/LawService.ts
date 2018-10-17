import * as Sequelize from "sequelize";
import * as LawModel from './../../db/model/Law';
import * as VoteModel from './../../db/model/Vote';
import { ILawInstance, ILawAttributes } from "./../../db/model/Law";
import DbService from "./dbService";
import { IUserAttributes } from "../model/User";

export default class UserService extends DbService {
  setTransaction(transaction: Sequelize.Transaction) {
    this.transaction = transaction;
  }
  async getLawById(id: number | string) {
    let options: Sequelize.FindOptions<ILawAttributes> = {
      transaction: this.transaction
    }
    return await LawModel.model.findById(id, options);
  }

  async getLawByIdIncludingVote(id: number | string,userId) {
    let options: Sequelize.FindOptions<ILawAttributes> = {
      transaction: this.transaction
    }
    if(userId){
      options.include=[{
        model:VoteModel.model,
        required:false
      }]
    }
    return await LawModel.model.findById(id, options);
  }
  
  async deleteLawById(id: number | string) {
    let options: Sequelize.DestroyOptions = {
      where: { id: id },
      transaction: this.transaction
    }
    return await LawModel.model.destroy(options);
  }
  async updateLaw(User: ILawInstance, fields: ILawAttributes) {
    let options: Sequelize.UpdateOptions = {
      where: { id: User.id },
      transaction: this.transaction
    }
    return await LawModel.model.update(fields, options);
  }

  async createLaw(User: ILawAttributes) {
    let options: Sequelize.CreateOptions = {
      transaction: this.transaction
    }
    return await LawModel.model.create(User, options);
  }

  async getAllLaws(){
    let options: Sequelize.FindOptions<ILawAttributes> = {
      transaction: this.transaction
    }
    return await LawModel.model.findAll(options);
  }
  
  async getAllLawsWithUsersVotes(user:IUserAttributes){
    let options: Sequelize.FindOptions<ILawAttributes> = {
      transaction: this.transaction,
      include:[
        {
          model:VoteModel.model,
          where:{
            userId:user.id,
          }
        }
      ]
    }
    await LawModel.model.findAll(options);
  }

  async getLawsByPage(pageNum:number,userId?:number,status?:string){
    let options: Sequelize.FindOptions<ILawAttributes> = {
      transaction: this.transaction,
      offset:(pageNum-1)*20,
      limit:20,
      order:[
        ['govId','DESC']
      ]
    }
    if(userId){
      options.include=[{
        model:VoteModel.model,
        where:{userId:userId},
        required:false
     }]
    }
    if(status){
      options.where={status:status};
    }
    return await LawModel.model.findAll(options);
  }
}

export const globalLawService = new UserService();