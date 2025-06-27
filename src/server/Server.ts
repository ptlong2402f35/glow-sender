import http from "http";
import { App } from "~/app/App";
import express from 'express';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export class Server {
  private appInstance: express.Application;
  private server?: http.Server;

  constructor() {
    this.appInstance = App.instance;
  }

  public start() {
    this.server = http.createServer(this.appInstance);
    this.server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }

  public stop() {
    this.server?.close(() => {
      console.log("Server stopped !!!");
    });
  }
}
