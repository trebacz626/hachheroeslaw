import thumbnailGenerator from 'video-thumbnail-generator';
import * as kue from 'kue';

var queue = kue.createQueue({
  "prefix": "q", "redis": {
    "host":"127.0.0.1"
  }
});


export async function enqueueThumbnailGeneration(post) {
  //queue.create("generate-thumbnail")
}
function generateThumbnail(sourcePath) {
  const tg = new thumbnailGenerator({
    sourcePath: sourcePath,
    thumbnailPath:'./thumbnail'
  });
  let outPath = tg.generateOneByPercent(1);
}

