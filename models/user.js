const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    userName: {
      type: String,
      require: [true, "UserName is required"],
    },

    email: {
      type: String,
      require: [true, "Email is required"],
    },

    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = model("User", UserSchema);
