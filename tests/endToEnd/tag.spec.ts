import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("Tag test", () => {
  it('select a tag by name', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Tags/awesome' )
        .expect(200)
        .then(function (res) {
          expect(res.body.id).to.be.equal(5);
        })


    } catch (err) {
      throw err;
    }

  })

  it('select tags by page', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Tags/popular/0' )
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.instanceOf(Array);
        })


    } catch (err) {
      throw err;
    }

  })

  it('select tags by page', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Tags/popular/-1')
        .expect(400)


    } catch (err) {
      throw err;
    }

  })
});
