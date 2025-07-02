import http from "http";
import App from "./App";
import express from "express";
import debug from "debug";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const util = require("util");
export default class Server {
  private appInstance: express.Application;
  private server?: http.Server;

  constructor() {
    this.appInstance = App.instance;
  }

  public start() {
    if (!this.appInstance) {
      new App().start();
      this.appInstance = App.instance;
    }
    // console.log("this.appInstance", this.appInstance);
    this.server = http.createServer(this.appInstance);
    this.server.listen(PORT, "127.0.0.1");
    this.server.on("listening", () => this.onListening(this.server));
    this.server.on("error", this.onError);
  }

  public stop() {
    this.server?.close(() => {
      console.log("Server stopped !!!");
    });
  }

  private onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  private onListening(server?: http.Server) {
    var addr = this.server?.address();
    var bind =
      typeof addr === "string"
        ? "pipe " + addr
        : "port " + (addr && typeof addr === "object" ? addr.port : "");

    if (addr && typeof addr === "object") {
      console.log(`Listening on http://localhost:${addr.port}`);
    } else {
      console.log(`Listening on ${bind}`);
    }
    debug("Listening on " + bind);
  }
}
