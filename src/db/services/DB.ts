import UserService from "./UserService";
import * as Sequelize from "sequelize";
import sequelizeManager from "../../db/model/sequelizeManager";

export default class DB {//class used to store transaction so in controller we only need to execute begin coommit or rollback method
  transaction: Sequelize.Transaction;
  public User: UserService;

  constructor() {
    this.User = new UserService();
  }
  async beginChanges() {
    this.transaction = await sequelizeManager.sequelize.transaction({
      autocommit: false
    });
    this.User.setTransaction(this.transaction);
  }
  async commitChanges() {
    await this.transaction.commit();
  }
  async rollbackChanges() {
    await this.transaction.rollback();
  }
}