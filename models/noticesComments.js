const { Schema, model } = require("mongoose");

const NoticesCommentsSchema = Schema({
  id: {
    type: Number,
    ref: "Notices",
    require: true,
  },
  Comments: {
    type: Array,
  },
});

module.exports = model("NoticesComments", NoticesCommentsSchema);
