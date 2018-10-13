import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("Level test", () => {
  it('get levels by page', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Levels/0' )
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.instanceOf(Array);
        })


    } catch (err) {
      throw err;
    }

  })

  it('get levels by page', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Levels/-1')
        .expect(400)


    } catch (err) {
      throw err;
    }

  })
  
});
