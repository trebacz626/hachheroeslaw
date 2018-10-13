import { expect } from 'chai';
import 'mocha';
import UserService from "./../../../src/db/services/UserService"
import * as Sequelize from "sequelize"
import SequelizeManager from './../../../src/db/model/sequelizeManager'
describe("Users db test", () => {
  //this.timeout(5000);
  it('select a User', async () => {
    //SETTINGS


    //ARRANGE
    const userService = new UserService();
    //ACT
    try {
      SequelizeManager.connect();
      let User = await userService.getUserById('b36c0333-ba78-477b-b444-ad57f87d51b8');
      expect(User.email).to.be.equal("_ext_@bk.ru");
    } catch (err) {
      throw err;
    }

  })
});
