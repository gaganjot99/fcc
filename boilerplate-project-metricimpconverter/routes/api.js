'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res)=>{
    const input = req.query.input
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    let returnConvert = convertHandler.convert(initNum, initUnit)
    let returnNum = convertHandler.getNum(returnConvert)
    let returnUnit = convertHandler.getUnit(returnConvert)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    if(['invalid number and unit', 'invalid number', 'invalid unit'].includes(string)){
      res.send(string)
    }
    res.json({initNum, initUnit, returnNum, returnUnit, string })
  })

};
