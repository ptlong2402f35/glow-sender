import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import KafkaManager from '../services/kafka/KafkaManager';
import KafkaService from '../services/kafka/KafkaService';
import cookieParser from "cookie-parser";
import createError from "http-errors";
import db from '../models/index';
import Config from '../config/Config'; 
import CaptureEventHandler from './captureSender/handler/CaptureEventHandler';
import PGWatcher from './captureSender/services/eventWatcher/PGWatcher';
import UserEventWatcher from './captureSender/services/eventWatcher/UserEventWatcher';
const ServiceTagName = Config.module.serviceTagName;
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
    db.sequelize.authenticate()
      .then(() => {
        console.log('Connection to DB has been established successfully.');
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
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
    await this.stopJob();
    await this.stopService();
    process.exit(0);
  }

  public startJob() {
    
  }

  public async stopJob() {

  }

  public async startService() {
    await new KafkaManager().getInstance().init();
    await new PGWatcher().getInstance().init();
    switch (ServiceTagName) {
      case "Captured-sender-module": {
        await new UserEventWatcher().getInstance().init();
        await new CaptureEventHandler().consumeRegist();
        break;
      }
    }
    await new KafkaService().getKafkaTopic();
  }

  public async stopService() {
    await new KafkaManager().getInstance().disconnect();
  }

}

