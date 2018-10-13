import 'mocha';
import { expect } from 'chai';
import name, { NameTypes } from './../../src/utils/random name generator/Name'
import Name from './../../src/utils/random name generator/Name';

describe("testing name", () => {
  //this.timeout(5000);
  it('get adjectives', async () => {
    //SETTINGS


    //ARRANGE

    //ACT
    try {
      let names = await name.getAdjectives();

      expect(names[1]).to.be.equal("Able")
    } catch (err) {
      throw err;
    }

  })

});

describe("testing name get random", () => {
  //this.timeout(5000);
  it('get adjectives', async () => {
    //SETTINGS


    //ARRANGE

    //ACT
    try {
      let name = await Name.getRandomNames(NameTypes.CARNIVORE);
      expect(name).to.be.string;
    } catch (err) {
      throw err;
    }

  })

});