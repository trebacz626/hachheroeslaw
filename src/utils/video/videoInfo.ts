import * as ffprobe from 'ffprobe';
import * as ffprobeStatic from 'ffprobe-static'
import logger from '../logger/logger';




export async function getVideoDimensions(path:string) {
  try {
    let info = await ffprobe(path, { path: ffprobeStatic.path });
    return {
      w: info.streams[0].width,
      h: info.streams[0].height
    }
  }
  catch (err)
  {
    logger.error(err);
    return {
      w: 0,
      h: 0
    }
  }
}