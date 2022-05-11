var express = require("express");
var router = express.Router();
const isAuthenticated = require("../middlewares/validar-jwt");
const {
  getMainDataNotices,
  getEspecificNotice,
  getNoticeComments,
  insertNoticeComments,
  DeleteNoticeComment,
  EditNoticeComment,
} = require("../controller/notices");

router.get("/main-data", function (req, res, next) {
  getMainDataNotices(req, res);
});

router.post("/notice-path", function (req, res, next) {
  getEspecificNotice(req, res);
});

router.post("/notice-comments", function (req, res, next) {
  getNoticeComments(req, res);
});

router.post(
  "/insert-notice-comments",
  isAuthenticated,
  function (req, res, next) {
    insertNoticeComments(req, res);
  }
);

router.post(
  "/delete-notice-comment",
  isAuthenticated,
  function (req, res, next) {
    DeleteNoticeComment(req, res);
  }
);

router.post("/edit-notice-comment", function (req, res, next) {
  EditNoticeComment(req, res);
});

module.exports = router;
