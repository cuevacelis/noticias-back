const express = require("express");
const cors = require("cors");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
const { dbConnection } = require("./database/config");

class ConfigApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth/local",
      notices: "/api/dataNotices",
    };
    console.log("Cargando...");
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.paths.auth, require("./routes/auth"));
    this.app.use(this.paths.notices, require("./routes/notices"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el puerto", this.port);
    });
  }
}

module.exports = ConfigApp;
