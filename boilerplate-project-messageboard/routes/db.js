const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./db/boards.db", (err) => {
  if (err) {
    console.log("error happenend while connecting to database");
  }
  console.log("in file database Connected!");
  createTables();
});

const createTables = () => {
  db.serialize(function () {
    db.run(
      "CREATE TABLE IF NOT EXISTS threads (_id INTEGER PRIMARY KEY, board VARCHAR(100) NOT NULL, text TEXT NOT NULL, delete_password VARCHAR(100) NOT NULL, created_on DATETIME default CURRENT_TIMESTAMP, bumped_on DATETIME default CURRENT_TIMESTAMP, reported varchar(10))",
      [],
      (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("boards table created");
      }
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS replies (_id INTEGER PRIMARY KEY, text TEXT NOT NULL, delete_password VARCHAR(100) NOT NULL, created_on DATETIME default CURRENT_TIMESTAMP, reported BOOLEAN, thread_id INTEGER NOT NULL, FOREIGN KEY (thread_id) REFERENCES threads (_id))",
      [],
      (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("replies table created");
        //addBoard({board: "first", text: "initail text", password: "1234"}).then(data=>console.log(data))
        //deleteThread(1, '134').then(data=>console.log(data))
        //addReply({id:3, text: "hello", password: "3232"}).then(data=>console.log(data))
        //getThread(3).then(data=>console.log(data))
        //getReplies(3).then(data=>console.log(data))
      }
    );
  });
};

const addBoard = (body) => {
  return new Promise((res, rej) => {
    db.run(
      "INSERT INTO threads(board, text, delete_password, reported) VALUES(?, ?, ?, ?)",
      [body.board, body.text, body.password, "false"],
      (err) => {
        if (err) {
          rej(err);
        }
        res("success");
      }
    );
  });
};

const addReply = (body) => {
  return new Promise((res, rej) => {
    db.run(
      "INSERT INTO replies(thread_id, text, delete_password, reported) VALUES(?, ?, ?, ?)",
      [body.id, body.text, body.password, "false"],
      (err) => {
        if (err) {
          rej(err);
        }
        db.run(
          "UPDATE threads SET bumped_on = CURRENT_TIMESTAMP WHERE _id = ?",
          [body.id],
          (err) => {
            if (err) {
              rej(err);
            }
            res("success");
          }
        );
      }
    );
  });
};

const deleteThread = (id, pw) => {
  return new Promise((res, rej) => {
    db.get(
      "SELECT delete_password FROM threads WHERE _id = ?",
      [id],
      (err, row) => {
        if (err) {
          rej(err);
        }
        if (row.delete_password == pw) {
          db.run("DELETE FROM threads WHERE _id = ?", [id], (err) => {
            if (err) {
              rej(err);
            }
            res("success");
          });
        } else {
          res("incorrect password");
        }
      }
    );
  });
};

const deleteReply = (id, pw) => {
  return new Promise((res, rej) => {
    db.get(
      "SELECT delete_password FROM replies WHERE _id = ?",
      [id],
      (err, row) => {
        if (err) {
          rej(err);
        }
        if (row.delete_password == pw) {
          db.run(
            "UPDATE replies SET text = '[deleted]' WHERE _id = ?",
            [id],
            (err) => {
              if (err) {
                rej(err);
              }
              res("success");
            }
          );
        } else {
          res("incorrect password");
        }
      }
    );
  });
};

const getThread = (id) => {
  return new Promise((res, rej) => {
    db.get(
      "SELECT _id, text, created_on, bumped_on FROM threads WHERE _id = ?",
      [id],
      async (err, row) => {
        if (err) {
          rej(err);
        }
        let newRow = await getReplies(row._id, 20);
        row.replies = newRow;
        res(row);
      }
    );
  });
};

const getThreads = (board) => {
  return new Promise((res, rej) => {
    db.all(
      "SELECT _id, text, created_on, bumped_on FROM threads WHERE board = ? ORDER BY bumped_on DESC LIMIT 10",
      [board],
      (err, rows) => {
        if (err) {
          rej(err);
        }
        const newRows = Promise.all(
          rows.map(async (ele) => {
            let arr = await getReplies(ele._id, 3);
            ele["replies"] = arr;
            return ele;
          })
        );
        res(newRows);
      }
    );
  });
};

const getReplies = (id, limit) => {
  return new Promise((res, rej) => {
    db.all(
      "SELECT _id, text, created_on FROM replies WHERE thread_id = ? ORDER BY created_on DESC LIMIT ?",
      [id, limit],
      (err, rows) => {
        if (err) {
          rej(err);
        }
        res(rows);
      }
    );
  });
};

const reportThread = (id) => {
  return new Promise((res, rej) => {
    db.run(
      "UPDATE threads SET reported = 'true' WHERE _id = ?",
      [id],
      (err) => {
        if (err) {
          rej(err);
        }
        res("reported");
      }
    );
  });
};

const reportReply = (id) => {
  return new Promise((res, rej) => {
    db.run(
      "UPDATE replies SET reported = 'true' WHERE _id = ?",
      [id],
      (err) => {
        if (err) {
          rej(err);
        }
        res("reported");
      }
    );
  });
};

module.exports = {
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
};
