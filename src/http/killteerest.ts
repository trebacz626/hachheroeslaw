import debug = require('debug');
import express = require('express');
import * as passport from 'passport';
import path = require('path');
import *as morgan from 'morgan';
import routes from './routes/index';
import { Router } from 'express-serve-static-core';
import SequelizeManager from './../db/model/sequelizeManager'


import authenticateRoutes from './routes/authenticate'
import userRoutes from './routes/user'
import lawRoutes from './routes/law'
import voteRoutes from './routes/vote'

import * as passportSetup from './../utils/passport/auth'
import * as  bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import config from './../configuration/main'
import logger from '../utils/logger/logger';
/**
 * 1 Express app instance and it's configuration/setup*/
class KillterestApp {
  public port: number
  public app: express.Application
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setup();
  }
  setup() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit:1000000000 }));
    this.app.use(bodyParser.json({ limit: "500mb"}));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(morgan('dev'));
    passportSetup.setup(passport);
    this.app.use(passport.initialize());
    //setting headers for browser to accept requests
    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', "*");
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS,PUT");
      res.setHeader('Access-Control-Allow-Headers', "content-type");
      next();
    })
    this.mountRoutes();

    //NOT FOUND error handler
    this.app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });

    //Error handler if error has no status sends 500(internal)
    this.app.use((err: any, req, res, next) => {
      console.log(err);
      let status;
      if (err.status) status=err.status;
      else {
        logger.error(err);
        status = 500;
        err = {
          message: "Internal server error"
        }
      }
       res.status(status).json( {
         error: err
       });
     });
  }
  //Setting up routes
  mountRoutes() {
    this.app.use('/', routes);
    var router: Router = express.Router();
    authenticateRoutes(router, passport);
    userRoutes(router);
    lawRoutes(router);
    voteRoutes(router);
    this.app.use('/api', router);
  }
  async connectDB() {
    await SequelizeManager.connect();
  }
  //after setup is completed we can start listen
  async start() {
    this.app.listen(this.port, async (err) => {
      if (err) {
        logger.error("fatal error");
        logger.error(err);
      } else {
        console.log("listening on port " + this.port);
        await this.connectDB();
      }


    })
  }
}


export default  KillterestApp;






