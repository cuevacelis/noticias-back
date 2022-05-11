require("dotenv").config();
const ConfigApp = require("./configApp");

const app = new ConfigApp();

app.listen();

//module.exports = app.exportApp();
