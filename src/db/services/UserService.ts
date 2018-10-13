import * as Sequelize from "sequelize";
import * as UserModel from './../../db/model/User';
import { IUserInstance, IUserAttributes } from "./../../db/model/User";
import DbService from "./dbService";

export default class UserService extends DbService {
  setTransaction(transaction: Sequelize.Transaction) {
    this.transaction = transaction;
  }
  async getUserById(id: number | string) {
    let options: Sequelize.FindOptions<UserModel.IUserAttributes> = {
      transaction: this.transaction
    }
    return await UserModel.model.findById(id, options);
  }
  
  async deleteUserById(id: number | string) {
    let options: Sequelize.DestroyOptions = {
      where: { id: id },
      transaction: this.transaction
    }
    return await UserModel.model.destroy(options);
  }
  async updateUser(User: IUserInstance, fields: IUserAttributes) {
    let options: Sequelize.UpdateOptions = {
      where: { id: User.id },
      transaction: this.transaction
    }
    return await UserModel.model.update(fields, options);
  }

  async createUser(User: IUserAttributes) {
    let options: Sequelize.CreateOptions = {
      transaction: this.transaction
    }
    return await UserModel.model.create(User, options);
  }

  async findUserByEmail(email: string) {
    let options: Sequelize.FindOptions<UserModel.IUserAttributes> = {
      transaction: this.transaction,
      where: {
           email:email 
      }
    }
    return await UserModel.model.findOne(options);
  }

  async findUserByMailAndPassword(email: string, passwordHash: string) {
    let options: Sequelize.FindOptions<UserModel.IUserAttributes> = {
      transaction: this.transaction,
      where: {
        [Sequelize.Op.or]: [
          { email: email },
          { userName: email }
        ],
        passwordHash: passwordHash
      }
    }
    return await UserModel.model.findOne(options);
  }

  async findUserByRefreshToken(refreshToken: string) {
    let options: Sequelize.FindOptions<UserModel.IUserAttributes> = {
      transaction: this.transaction,
      where: {
           refreshToken:refreshToken 
      }
    }
    return await UserModel.model.findOne(options);
  }
 
}

export const globalUserService = new UserService();