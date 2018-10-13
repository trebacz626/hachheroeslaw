import 'mocha';
import { expect } from 'chai';
import * as path from 'path';
import azureService from '../../../../src/services/azure blob storage/azureService';
describe("testing azure uploader", () => {
  //this.timeout(5000);
  it('blob upload', async () => {
    //SETTINGS
    const pathToFile = __dirname+"/test.mp4";
    const blobName = path.basename(pathToFile, path.extname(pathToFile));

    //ARRANGE

    //ACT
    try {
      let uploadUrl = await azureService.upload(pathToFile, blobName);
      let expectedUrl = "https://killterest.blob.core.windows.net/killterest/test";
      expect(uploadUrl).to.be.equal(expectedUrl);
    } catch (err) {
      throw err;
    }

  })

});
