import * as Sequelize from "sequelize";
import * as LawModel from './../../db/model/Law';
import * as VoteModel from './../../db/model/Vote';
import { ILawInstance, ILawAttributes } from "./../../db/model/Law";
import DbService from "./dbService";
import { IUserAttributes } from "../model/User";

export default class LawService extends DbService {
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
  async updateLaw(law: ILawInstance, fields: ILawAttributes) {
    let options: Sequelize.UpdateOptions = {
      where: { id: law.id },
      transaction: this.transaction
    }
    return await LawModel.model.update(fields, options);
  }

  async createLaw(law: ILawAttributes) {
    let options: Sequelize.CreateOptions = {
      transaction: this.transaction
    }
    return await LawModel.model.create(law, options);
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
      offset:(pageNum-1)*100,
      limit:100,
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

  async bulkCreateLaws(laws: Array<ILawAttributes>) {
    let options: Sequelize.BulkCreateOptions = {
      transaction: this.transaction
    }
    return await LawModel.model.bulkCreate(laws, options);
  }

  async bulkUpdateLaws(laws: Array<ILawInstance>) {
    let options: Sequelize.BulkCreateOptions = {
      transaction: this.transaction
    }
    var requestsToresolve=[];
        laws.forEach(function(law){
            requestsToresolve.push((async function(){
                await law.save();
            })())
        })
        await Promise.all(requestsToresolve);
  }


}

export const globalLawService = new LawService();