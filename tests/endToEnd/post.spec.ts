import { should, expect } from 'chai';
import 'mocha';
import * as supertest from 'q-supertest'
import logger from '../../src/utils/logger/logger';
const api = supertest('http://localhost:80');

describe("Post test", () => {
  it('structured query by level', async () => {
    //SETTINGS


    //ACT
    try {
      await api.put('/api/Posts/structuredQuery')
        .send({ Level:"CezarySurrenderOrDie_Van_P",Page:"0"})
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.instanceOf(Array);
        })


    } catch (err) {
      throw err;
    }

  })

  it('structured query by modifier', async () => {
    //SETTINGS


    //ACT
    try {
      await api.put('/api/Posts/structuredQuery')
        .send({ Mod: "KATANAONLY", Page: "0" })
        .expect(200)
        .then(function (res) {
          expect(res.body).to.be.instanceOf(Array);
        })


    } catch (err) {
      throw err;
    }

  })

  it('select post by handle', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Posts/DependableInsecureAmaranthRhinoceros')
        .expect(200)
        .then(function (res) {
          expect(res.body.id).to.be.equal(536166);
        })


    } catch (err) {
      throw err;
    }

  })

  it('stream post by handle', async () => {
    //SETTINGS


    //ACT
    try {
      await api.get('/api/Stream/DependableInsecureAmaranthRhinoceros')
        .expect(302)
        .expect("Found. Redirecting to https://killterest.blob.core.windows.net/killterest/a145c49a6bcd4a9193f6addaf9db7ec6-17-12-16-00-52-29_6_madCorridor.mp4")


    } catch (err) {
      throw err;
    }

  })

  it('update post gfyName', async () => {
    //SETTINGS


    //ACT
    try {
      let gfyName = (await api.get('/api/Posts/DependableInsecureAmaranthRhinoceros')
        .expect(200)).body.gfyName;
      let res = await api.put('/api/Posts/DependableInsecureAmaranthRhinoceros/GfyName/qqq')
        .expect(200);
      expect(res.body.gfyName).to.be.equals("qqq");
      await api.put('/api/Posts/DependableInsecureAmaranthRhinoceros/GfyName/' + gfyName);


    } catch (err) {
      throw err;
    }

  })

  it('view ', async () => {
    //SETTINGS


    //ACT
    try {
      let views = (await api.put('/api/Posts/DependableInsecureAmaranthRhinoceros/view')
        .expect(200)).body;
      let res = await api.put('/api/Posts/DependableInsecureAmaranthRhinoceros/view')
        .expect(200);
      expect(parseInt(res.body)).to.be.equals(views + 1);


    } catch (err) {
      throw err;
    }

  })

  //find user with some uploaders attached
  it('modify ', async () => {
    //SETTINGS

    const agent = supertest.agent('http://localhost:80');
    //ACT
    try {
      await agent.post('/api/Account/login')
        .send({ Email: "a@b.com", Password: "ab" })
        .expect(200);
      let description = (await agent.get('/api/Posts/LimpDimwittedLibertyRabbit')
        .expect(200)).body.description;
      let res = await agent.put('/api/Posts/LimpDimwittedLibertyRabbit/modify')
        .send({description:"cfdb #one #two #three"})
        .expect(200);
      logger.error(res.body);
      expect(res.body.Tags.length).to.be.equals(3);

      await agent.put('/api/Posts/LimpDimwittedLibertyRabbit/modify')
        .send({ description: description })


    } catch (err) {
      throw err;
    }

  })
  
});
