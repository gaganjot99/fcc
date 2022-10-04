function ConvertHandler() {
  
  this.getNum = function(input) {
    if(input.includes('/')){
      if(input.split('/').length > 2){
        return 'invalid number'
      }
    }
    let result = eval(input.split(/[a-zA-Z]+/)[0])
    if(result == undefined){
      return 1;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/)[0].toLowerCase()
    if(result == 'l'){
    result = 'L'
    }
    if(!['mi','km','L','gal','lbs','kg'].includes(result)){
      return 'invalid unit'
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit){
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      case 'L':
        return 'gal'
      case 'gal':
        return 'L'
      default:
        return 'invalid unit'
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit){
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
      case 'L':
        return 'liters'
      case 'gal':
        return 'gallons'
      default:
        return 'invalid unit'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if(initNum=='invalid number' && initUnit == 'invalid unit'){
      return 'invalid number and unit'
    }
    if(initNum == 'invalid number'){
      return 'invalid number'
    }
    if(initUnit == 'invalid unit'){
      return 'invalid unit'
    }

    switch (initUnit){
      case 'mi':
        return parseFloat((initNum*miToKm).toFixed(5))+'km'
      case 'km':
        return parseFloat((initNum/miToKm).toFixed(5))+'mi'
      case 'kg':
        return parseFloat((initNum/lbsToKg).toFixed(5))+'lbs'
      case 'lbs':
        return parseFloat((initNum*lbsToKg).toFixed(5))+'kg'
      case 'L':
        return parseFloat((initNum/galToL).toFixed(5))+'gal'
      case 'gal':
        return parseFloat((initNum*galToL).toFixed(5))+'L'
      default:
        return 'invalid unit'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(['invalid number and unit', 'invalid number', 'invalid unit'].includes(this.convert(initNum, initUnit))){
      return this.convert(initNum, initUnit)
    }
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
  };
  
}

module.exports = ConvertHandler;
