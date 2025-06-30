import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
var cookieParser = require("cookie-parser");
var createError = require("http-errors");

export default class App {
  public static instance: express.Application;

  constructor() {
    if(!App.instance) {
      App.instance = express();
    }
  }

  private async config() {
    App.instance.use(express.json());
    App.instance.use(cors());
    // view engine setup
    App.instance.set("views", path.join(__dirname, "views"));
    App.instance.set("view engine", "ejs");

    App.instance.use(logger("common"));
    //App.instance.use(express.json());
    App.instance.use(
      bodyParser.json({
        verify: (req: any, res, buf) => {
          req.rawBody = buf;
        },
      }),
    );
    App.instance.use(express.urlencoded({ extended: false }));
    App.instance.use(cookieParser());
    App.instance.use(express.static(path.join(__dirname, "public")));

    App.instance.use(function (req, res, next) {
      next(createError(404));
    });
  }

  public start() {
    if(!App.instance) {
      App.instance = express();
    }
    this.config();
    this.startJob();
    this.startService();
  }

  public async stop() {
    this.stopJob();
    this.stopService();
  }

  public startJob() {
    
  }

  public stopJob() {

  }

  public startService() {

  }

  public stopService() {

  }

}

