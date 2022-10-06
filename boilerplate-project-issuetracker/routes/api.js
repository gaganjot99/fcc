"use strict";
const { issueData } = require("./db");

const data = {};
let currentId = 0;
function createListing(title, text, createdBy, AssignTo, status) {
  if (AssignTo == undefined) AssignTo = "";
  if (status == undefined) status = "";

  return {
    _id: ++currentId,
    assigned_to: AssignTo,
    status_text: status,
    open: true,
    issue_title: title,
    issue_text: text,
    created_by: createdBy,
    created_on: new Date(),
    updated_on: new Date(),
  };
}

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      let query = req.query;
      issueData.find({ project, ...query }).then((rows, err) => {
        if (err) {
          return res.status(500).json({ error: "some error happenned" });
        }
        res.status(200).json(rows);
      });
    })

    .post(function (req, res) {
      let project = req.params.project;
      if (
        !req.body.issue_title ||
        !req.body.issue_text ||
        !req.body.created_by
      ) {
        return res.status(200).json({ error: "required field(s) missing" });
      }
      issueData.create({ project, ...req.body }).then((data) => {
        delete data.__v;
        res.status(200).json(data);
      });
    })

    .put(function (req, res) {
      let project = req.params.project;
      if (!req.body._id) {
        return res.json({ error: "missing _id" });
      }
      if (Object.keys(req.body).length < 2) {
        return res
          .status(200)
          .json({ error: "no update field(s) sent", _id: req.body._id });
      }

      issueData
        .updateOne(
          { _id: req.body._id, project },
          { ...req.body },
          { upsert: false }
        )
        .then((data) => {
          if (data.modifiedCount == 0) {
            return res
              .status(200)
              .json({ error: "could not update", _id: req.body._id });
          }
          res
            .status(200)
            .json({ result: "successfully updated", _id: req.body._id });
        });
    })

    .delete(function (req, res) {
      let project = req.params.project;
      if (!req.body._id) {
        return res.json({ error: "missing _id" });
      }
      issueData.deleteOne({ _id: req.body._id, project }).then((data) => {
        if (data.deletedCount == 0) {
          return res.json({ error: "could not delete", _id: req.body._id });
        }
        res.json({ result: "successfully deleted", _id: req.body._id });
      });
    });
};
