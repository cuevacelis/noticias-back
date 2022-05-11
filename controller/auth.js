const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        status: "error",
        msg: "user o pass incorrect",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        msg: "user o pass incorrect",
      });
    }

    const tokenJWT = await generarJWT(user.id);
    const envio = `Bearer ${tokenJWT}`;
    const username = user.userName
    res.json({
      status: "success",
      msg: "login succeful",
      username , 
      envio,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error Login",
    });
  }
};

const register = async (req, res) => {
  try {
    const { userName , email, password } = req.body;

    const userFind = await User.findOne({ email });

    if (userFind) {
      return res.status(400).json({
        status: "error",
        msg: "Este usuario ya existe",
      });
    }

    const user = new User({ userName , email, password });
    
    if (password.length < 8) {
      return res.status(400).json({
        status: "error",
        msg: "La pass debe ser mayor a 8 caracteres",
      });
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    console.log("aqui va a crear el user")
    await user.save();
    console.log("aqui lo creo sin problema")
    res.status(200).json({
      status: "success",
      msg: "Usuario creado",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error Register",
    });
  }
};

module.exports = { login, register };
