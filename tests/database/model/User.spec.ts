import { expect } from 'chai';
import 'mocha';
import * as UserModel from "./../../../src/db/model/User"
import * as Sequelize from "sequelize"
import SequelizeManager from './../../../src/db/model/sequelizeManager'
describe("Users db test", () => {
  //this.timeout(5000);
  it('select a User', async () => {
    //SETTINGS


    //ARRANGE

    //ACT
    try {
      SequelizeManager.connect();
      await UserModel.model.sync();
      let User = await UserModel.model.findById('b36c0333-ba78-477b-b444-ad57f87d51b8');
      expect(User.email).to.be.equal("_ext_@bk.ru");
    } catch (err) {
      throw err;
    }

  })
});
