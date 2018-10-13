import { should,expect } from 'chai';
import 'mocha';
import KillterestApp from '../../src/http/killteerest'
import chaiHttp from 'chai-http'
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("Uploader test", () => {
  it('select an uploader', async () => {
    //SETTINGS

    
    //ACT
    try {
      await api.get('/api/Uploader/uploader' + "")
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.not.equal(String);
        })
      

    } catch (err) {
      throw err;
    }

  })
});
