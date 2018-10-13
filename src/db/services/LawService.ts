import * as Sequelize from "sequelize";
import * as LawModel from './../../db/model/Law';
import { ILawInstance, ILawAttributes } from "./../../db/model/Law";
import DbService from "./dbService";

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


 
}

export const globalLawService = new UserService();