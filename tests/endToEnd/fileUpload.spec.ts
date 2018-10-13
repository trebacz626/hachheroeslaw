import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("File upload test", () => {
  it('upload file', async () => {
    //SETTINGS


    //ACT
    try {
      await api.post('/api/Mp4Upload')
        .set('Content-Type','application/x-www-form-urlencoded')
        .set('X-UploaderFingerprint', 'tescik')
        .set('x-modifiers', 'katanaonly,endless')
        .set('x-level', 'developer-test')
        .attach('',__dirname+'/test.mp4')
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.not.null;
        })


    } catch (err) {
      throw err;
    }

  })
  
});
