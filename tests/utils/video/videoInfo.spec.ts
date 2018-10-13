import 'mocha';
import { expect } from 'chai';
import * as path from 'path';
import { getVideoDimensions } from './../../../src/utils/video/videoInfo';

describe("testing azure uploader", () => {
  //this.timeout(5000);
  it('get dimensions', async () => {
    //SETTINGS
    const pathToFile = __dirname + "/test.mp4";

    //ARRANGE

    //ACT
    try {
      let videoInfo = await getVideoDimensions(pathToFile);
    } catch (err) {
      throw err;
    }

  })

});
