import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
const api = supertest('http://localhost:80');

describe("Authentication route test", () => {
  it('register', async () => {
    //SETTINGS


    //ACT
    try {
      await api.post('/api/Account/register')
        .send({ Email: "tom@superhotgame.com", Password: "123123@A" })
        .expect(409)
    } catch (err) {
      throw err;
    }

  })

  it('login', async () => {
    //SETTINGS


    //ACT
    try {
      let res = await api.post('/api/Account/login')
        .send({ Email: "tom@superhotgame.com", Password: "123123@A" })
        .expect(200);
      expect(res.body.id).to.be.equal("0271bdbb-71f3-471b-9ebd-4e456deb6384");
    } catch (err) {
      throw err;
    }

  })

  it('current user', async () => {
    //SETTINGS

    const agent = supertest.agent('http://localhost:80');
    //ACT
    try {
       await agent.post('/api/Account/login')
        .send({ Email: "tom@superhotgame.com", Password: "123123@A" })
        .expect(200);
      let res = await agent.get('/api/Account/currentUser')
        .expect(200);
      expect(res.body.id).to.be.equal("0271bdbb-71f3-471b-9ebd-4e456deb6384");
    } catch (err) {
      throw err;
    }

  })
  it('set name', async () => {
    //SETTINGS

    const agent = supertest.agent('http://localhost:80');
    //ACT
    try {
      await agent.post('/api/Account/login')
        .send({ Email: "tom@superhotgame.com", Password: "123123@A" })
        .expect(200);
      let res = await agent.put('/api/Account/setName/tomus-jhvcfzsfzdf')
        .expect(200);
      expect(res.body.customName).to.be.equal("tomus-jhvcfzsfzdf");
      await agent.put('/api/Account/setName/tom')
        .expect(200);
    } catch (err) {
      throw err;
    }

  })
  
  
});
