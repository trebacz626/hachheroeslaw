import * as Sequelize from "sequelize";

export default class DbService {
  transaction: Sequelize.Transaction;
  constructor() {

  }
  setTransaction(transaction: Sequelize.Transaction) {
    this.transaction = transaction;
  }

}
