'use strict';
const {db, addBoard, addReply, deleteThread, deleteReply, getThread, getThreads, getReplies, reportThread, reportReply} = require('./db')

module.exports = function (app) {
  
  app.route('/api/threads/:board');
    
  app.route('/api/replies/:board');

};
