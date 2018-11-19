import * as cluster from "cluster"
import KillterestApp from "./http/killteerest"
import logger from "./utils/logger/logger";
import { config } from "winston";
import { Suplier } from "./services/laws_suplier/suplier";

//CLUSTER SETUP

if (false/*process.env.NODE_ENV === 'prod'*/) {
  if (cluster.isMaster) {
    console.log("main worker");
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    cluster.on("online", (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
      console.log("Starting a new worker...");
      cluster.fork();
    });
    var suplier = new Suplier();
    suplier.start();
    //run custom workers eg. Video uploader,thumb generator etc


  } else {
    const killterest = new KillterestApp(process.env.port || 8080);
    killterest.start();
    logger.info("Server is up and running")
  }
} else {
  const killterest = new KillterestApp(process.env.port || 8080);
  killterest.start();
  logger.info("Server is up and running");
}