/*
 *
 *
 *       Complete the API routing below
 *
 *
 */
const { default: mongoose } = require("mongoose");
const { libData } = require("./db");
("use strict");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      libData.find().then((data) => {
        let newData = data.map((element) => {
          return {
            _id: element._id,
            title: element.title,
            commentcount: element.comments.length,
          };
        });
        res.status(200).json(newData);
      });
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function (req, res) {
      let title = req.body.title;
      if (!title) {
        return res.status(200).send("missing required field title");
      }
      libData.create({ title }).then((data) => {
        res.status(200).json({ title: data.title, _id: data._id });
      });
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      libData.deleteMany().then((data) => {
        res.status(200).send("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.status(200).send("no book exists");
      }
      libData.findOne({ _id: bookid }).then((data) => {
        if (!data) {
          return res.status(200).send("no book exists");
        }
        res.status(200).json(data);
      });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.status(200).send("no book exists");
      }
      let comment = req.body.comment;
      if (!comment) {
        return res.status(200).send("missing required field comment");
      }
      libData
        .findByIdAndUpdate(
          { _id: bookid },
          { $push: { comments: comment } },
          { new: true, upsert: false }
        )
        .then((data) => {
          if (!data) {
            return res.status(200).send("no book exists");
          }
          res.status(200).json(data);
        });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.status(200).send("no book exists");
      }
      libData.deleteOne({ _id: bookid }).then((data) => {
        if (data.deletedCount < 1) {
          return res.status(200).send("no book exists");
        }
        res.send("delete successful");
      });
    });
};
