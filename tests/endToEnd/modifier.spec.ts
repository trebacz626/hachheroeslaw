import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("Modifier test", () => {
  it('get modifier by name', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Modifiers/KATANAONLY' )
        .expect(200)
        .then(function (res) {
          expect(res.body.id).to.be.equal(3);
        })


    } catch (err) {
      throw err;
    }

  })
  
});
