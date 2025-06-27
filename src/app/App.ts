import express from 'express';

export class App {
  public static instance: express.Application;

  constructor() {
    App.instance = express();
    this.config();
    this.startJob();
    this.startService();
  }

  private config() {
    App.instance.use(express.json());
  }

  public start() {
    this.startJob();
    this.startService();
  }

  public stop() {
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
