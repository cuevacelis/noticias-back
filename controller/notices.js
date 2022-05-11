const Notices = require("../models/notices");
const NoticesComments = require("../models/noticesComments");
const User = require("../models/user");

const getMainDataNotices = async (req, res) => {
  try {
    const query = { estado: { $in: ["Null", "Online"] } };
    const listFind = await Notices.find(query).limit(20);

    res.json({
      msg: "Total de Noticias",
      data: listFind,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error getMainDataNotices",
    });
  }
};

const getEspecificNotice = async (req, res) => {
  try {
    const { path } = req.body;
    const query = { path: path };
    const listFind = await Notices.find(query);

    res.json({
      msg: "Noticia seleccionada",
      data: listFind,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error getEspecificNotice",
    });
  }
};

const getNoticeComments = async (req, res) => {
  try {
    const { id_num } = req.body;
    const query = { id: id_num };
    const listFind = await NoticesComments.find(query).select("Comments");

    res.json({
      msg: "Comentarios de noticias",
      data: listFind,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error getNoticeComments",
    });
  }
};

async function returnNextIdComment(id_num) {
  const id_Comment = await NoticesComments.find({ id: id_num }).sort({
    "Comments.id_Comment": 1,
  });
  const array_coments = id_Comment[0].Comments.reverse();
  if (array_coments === 0) {
    return 0;
  } else {
    return array_coments[0].id_Comment + 1;
  }
}

const insertNoticeComments = async (req, res) => {
  try {
    const { id_num, Comment } = req.body;
    const userFind = await NoticesComments.find({
      id: id_num,
    }).countDocuments();
    const userName = await User.find({ _id: req.tokenDecode.data });

    if (userFind === 0) {
      let new_obj = {
        id_Comment: 0,
        UserName: userName[0].userName,
        Comment: Comment[0].Comment,
        UrlImg: Comment[0].UrlImg,
      };

      const dataNewComment = {
        id: id_num,
        Comments: new_obj,
      };
      const Comments = new NoticesComments(dataNewComment);
      await Comments.save();
      res.json({
        msg: "sucess",
      });
    } else {
      console.log("Entro donde ya hay comentarios");
      let new_num = await returnNextIdComment(id_num);
      let new_obj = {
        id_Comment: new_num,
        UserName: userName[0].userName,
        Comment: Comment[0].Comment,
        UrlImg: Comment[0].UrlImg,
      };
      await NoticesComments.updateOne(
        { id: id_num },
        { $push: { Comments: new_obj } }
      );

      res.json({
        msg: "sucess",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error insertNoticeComments",
    });
  }
};

const DeleteNoticeComment = async (req, res) => {
  try {
    const { id_num, id_Comment } = req.body;

    await NoticesComments.updateOne(
      { id: id_num },
      { $pull: { Comments: { id_Comment: id_Comment } } }
    );
    res.json({
      msg: "sucess",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error DeleteNoticeComment",
    });
  }
};

const EditNoticeComment = async (req, res) => {
  try {
    console.log(req.body);
    const { id_num, id_Comment, comment_edit } = req.body;
    query = { id: id_num, "Comments.id_Comment": id_Comment };
    await NoticesComments.updateOne(query, {
      "Comments.$.Comment": comment_edit,
    });
    res.json({
      msg: "sucess",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: "Error EditNoticeComment",
    });
  }
};

module.exports = {
  getMainDataNotices,
  getEspecificNotice,
  getNoticeComments,
  insertNoticeComments,
  DeleteNoticeComment,
  EditNoticeComment,
};
