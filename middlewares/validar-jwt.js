const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const tokenRecibido = req.header("Authorization");
  const token = tokenRecibido.split(" ")[1];

  if (tokenRecibido.search("Bearer") === -1) {
    return res.status(403).json({
      msg: "Bearer not found",
    });
  }

  if (!token) {
    return res.status(403).json({
      msg: "Token not found",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({
        msg: "Token invalid",
      });
    }
    req.tokenDecode = decoded;
    next();
  });
};

module.exports = isAuthenticated;
