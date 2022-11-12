"use strict";
const {
  db,
  addBoard,
  addReply,
  deleteThread,
  deleteReply,
  getThread,
  getThreads,
  getReplies,
  reportThread,
  reportReply,
} = require("./db");

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .post((req, res) => {
      const board = req.params.board;
      addBoard({
        board,
        text: req.body.text,
        password: req.body.delete_password,
      }).then((data) => {
        res.send(data);
      });
    })
    .get((req, res) => {
      const board = req.params.board;
      getThreads(board).then((data) => {
        res.json(data);
      });
    })
    .put((req, res) => {
      const board = req.params.board;
      reportThread(req.body.thread_id).then((data) => {
        res.send(data);
      });
    })
    .delete((req, res) => {
      const board = req.params.board;
      deleteThread(req.body.thread_id, req.body.delete_password).then(
        (data) => {
          res.send(data);
        }
      );
    });

  app
    .route("/api/replies/:board")
    .post((req, res) => {
      const board = req.params.board;
      addReply({
        id: req.body.thread_id,
        text: req.body.text,
        password: req.body.delete_password,
      }).then((data) => {
        res.send(data);
      });
    })
    .get((req, res) => {
      const id = req.query.thread_id;
      getThread(id).then((data) => {
        res.json(data);
      });
    })
    .put((req, res) => {
      reportReply(req.body.reply_id).then((data) => {
        res.send(data);
      });
    })
    .delete((req, res) => {
      deleteReply(req.body.reply_id, req.body.delete_password).then((data) => {
        res.send(data);
      });
    });
};
