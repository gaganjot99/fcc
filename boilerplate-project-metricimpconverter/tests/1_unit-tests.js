const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

   test('convertHandler should correctly read a whole number input',()=>{
      assert.equal(convertHandler.getNum('45mi'), 45, 'getNum is not working with whole numbers');

   })
   test('convertHandler should correctly read a decimal number input',()=>{
      assert.equal(convertHandler.getNum('4.5mi'), 4.5, 'getNum is not working with decimal numbers');
      
   })
   test('convertHandler should correctly read a fractional input',()=>{
      assert.equal(convertHandler.getNum('4/5mi'), 4/5, 'getNum is not working with fractions numbers');
      
   })
   test('convertHandler should correctly read a fractional input with a decimal',()=>{
      assert.equal(convertHandler.getNum('4/5.5mi'), 4/5.5, 'getNum is not working with fractional decimal numbers');
      
   })
   test('convertHandler should correctly return an error on a double-fraction', ()=>{
    assert.equal(convertHandler.getNum('4/5/7mi'), 'invalid number', 'getNum is not working with two / numbers');

   })
   test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided',()=>{
      assert.equal(convertHandler.getNum('mi'), 1, '1 is returned for no number mentioned');
      
   })

   test('convertHandler should correctly read each valid input unit', ()=>{
    assert.equal(convertHandler.getUnit('45mi'), 'mi', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4.5kg'), 'kg', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4/5kM'), 'km', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4/5.5l'), 'L', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('mI'), 'mi', 'getUnit is not working');
   })
   
   test('convertHandler should correctly return an error for an invalid input unit',()=>{
      assert.equal(convertHandler.getUnit('46kvo'), 'invalid unit', 'getUnit is not working');
      
   })

   test('convertHandler should return the correct return unit for each valid input unit', ()=>{
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('kvo'), 'invalid unit');
   })

   test('convertHandler should correctly return the spelled-out string unit for each valid input unit', ()=>{
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('kvo'), 'invalid unit');
     })

     test('convertHandler should correctly convert gal to L',()=>{
      assert.equal(convertHandler.convert(4,'gal'), '15.14164L');
   })
   test('convertHandler should correctly convert L to gal',()=>{
      assert.equal(convertHandler.convert(13,'L'), '3.43424gal');
      
   })
   test('convertHandler should correctly convert mi to km', ()=>{
      assert.equal(convertHandler.convert(3.3,'mi'), '5.31082km');
   })
   
   test('convertHandler should correctly convert km to mi',()=>{
      assert.equal(convertHandler.convert(132,'km'), '82.0212mi');
   })
   test('convertHandler should correctly convert lbs to kg',()=>{
      assert.equal(convertHandler.convert(20,'lbs'), '9.07184kg');
      
   })
   test('convertHandler should correctly convert kg to lbs',()=>{
      assert.equal(convertHandler.convert(23,'kg'), '50.70636lbs');
   })
   

});