const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db/boards.db', (err)=>{
    if(err){
        console.log("error happenend while connecting to database");
    }
    console.log('in file database Connected!')
    createTables();
})

const createTables = () => {
    db.serialize(function () {
        db.run(
          "CREATE TABLE IF NOT EXISTS threads (_id INTEGER PRIMARY KEY, board VARCHAR(100) NOT NULL, text TEXT NOT NULL, delete_password VARCHAR(100) NOT NULL, created_on DATETIME default CURRENT_TIMESTAMP, bumped_on DATETIME default CURRENT_TIMESTAMP, reported BOOLEAN )",
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
          }
        );
      });
  };

const addBoard = (body) = {

}

module.exports = {db}