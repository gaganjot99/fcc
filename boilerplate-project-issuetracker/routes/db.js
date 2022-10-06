require("dotenv").config();
const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
    },
    issue_title: {
      type: String,
      required: true,
    },
    issue_text: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: String,
      default: "",
    },
    status_text: {
      type: String,
      default: "",
    },
    open: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_on", // Use `created_at` to store the created date
      updatedAt: "updated_on", // and `updated_at` to store the last updated date
    },
  }
);

const issueData = mongoose.model("allIssues", issueSchema, "issues");

const dblink = process.env.MONGO_URI;

const dbStart = () => {
  return mongoose
    .connect(dblink)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to database");
    });
};

module.exports = { dbStart, issueData };
