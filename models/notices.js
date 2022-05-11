const { Schema, model } = require("mongoose");

const NoticesSchema = Schema(
  {
    id_num: {
      type: Number,
      require: [true, "idNum is required"],
    },
    estado: {
      type: String,
      require: [true, "state is required"],
    },
    Tittle: {
      type: String,
      require: [true, "tittle is required"],
    },
    Subtitle: {
      type: String,
      require: [true, "subtitle is required"],
    },
    Internal_Content: {
      type: Array,
      require: [true, "Internal Content is required"],
    },
    url_IMG: {
      type: String,
      require: [true, "Url_Imgs is required"],
    },
    path: {
      type: String,
      require: [true, "Path is required"],
    },
    url_Extraida: {
      type: String,
      require: [true, "url_Extraida is required"],
    },
    Uploaded_Time: {
      type: Date,
      require: [true, "Upload_Time is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

NoticesSchema.virtual("comments", {
  ref: "NoticesComments",
  localField: "id_num",
  foreignField: "notice",
});

module.exports = model("Notices", NoticesSchema);
