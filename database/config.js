const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connect");
    console.log("¡Todo correcto, ya puedes usar el servicio!");
  } catch (error) {
    throw new Error("Error connect DB");
  }
};

module.exports = { dbConnection };
