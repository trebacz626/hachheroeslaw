import 'mocha';
import { expect } from 'chai';
import crossRequestAccumulator from '../../src/utils/CrossRequestAccumulator';
import * as AsyncLock from 'async-lock'

const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

describe("crossaccumulator test", () => {
  
  //this.timeout(5000);
  it('async cross request accumulator test',  async () => {
    //SETTINGS
    let lock = new AsyncLock();
    
    //ARRANGE

    //ACT
    try {
      async function a(i) {
        lock.acquire("acumulator", async function () {
          await setTimeoutPromise(Math.random()*20);
          crossRequestAccumulator.pushView("A");
          return "WIII";
        });
      }
      for (let i = 0; i < 20; i++) {
        a(i);
      }
      await lock.acquire("acumulator", async function () {
        return "WIII";
      });
      expect(crossRequestAccumulator.pushView("A")).to.be.equal(21);
    } catch (err) {
      throw err;
    }

  })
});
