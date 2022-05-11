const jwt = require("jsonwebtoken");

const generarJWT = (data) => {
  return new Promise((resolve, rejected) => {
    const payload = { data };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          rejected("Error token generate");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
