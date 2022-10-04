const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
   test('ConvertHandler can read any type of number', ()=>{
    assert.equal(convertHandler.getNum('45mi'), 45, 'getNum is not working with whole numbers');
    assert.equal(convertHandler.getNum('4.5mi'), 4.5, 'getNum is not working with decimal numbers');
    assert.equal(convertHandler.getNum('4/5mi'), 4/5, 'getNum is not working with fractions numbers');
    assert.equal(convertHandler.getNum('4/5.5mi'), 4/5.5, 'getNum is not working with fractional decimal numbers');
    assert.equal(convertHandler.getNum('4/5/7mi'), 'not valid number', 'getNum is not working with two / numbers');
    assert.equal(convertHandler.getNum('mi'), 1, '1 is returned for no number mentioned');
   })

   test('ConvertHandler can handle units', ()=>{
    assert.equal(convertHandler.getUnit('45mi'), 'mi', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4.5kg'), 'kg', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4/5km'), 'km', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('4/5.5L'), 'L', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('mi'), 'mi', 'getUnit is not working');
    assert.equal(convertHandler.getUnit('46kvo'), 'not valid unit', 'getUnit is not working');
   })

   test('ConvertHandler can return the correct return units', ()=>{
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('kvo'), 'not valid unit');
   })

   test('ConvertHandler can can spell units', ()=>{
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('kvo'), 'not valid unit');
     })

     test('ConvertHandler can return correct conversion results', ()=>{
      assert.equal(convertHandler.convert(3.3,'mi'), '5.31082km');
      assert.equal(convertHandler.convert(20,'lbs'), '9.07184kg');
      assert.equal(convertHandler.convert(13,'L'), '3.43424gal');
     })

     test('ConvertHandler can return correct final strings ', ()=>{
      assert.equal(convertHandler.getString(3.3,'mi',5.31082,'km'), '3.3 miles converts to 5.31082 kilometers');
      assert.equal(convertHandler.getString(13,'L',3.43424,'gal'), '13 liters converts to 3.43424 gallons');
     })

});