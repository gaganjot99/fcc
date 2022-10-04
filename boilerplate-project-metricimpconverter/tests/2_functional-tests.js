const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    const responses = {
        "12L":{"initNum":12,"initUnit":"L","returnNum":3.17007,"returnUnit":"gal","string":"12 liters converts to 3.17007 gallons"},
        "32g": "invalid unit",
        "3/7.2/4kg": "invalid number",
        "3/7.2/4kilomegagram": "invalid number and unit",
        "kg": {"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}
    }

    this.timeout(5000)
    test('Convert a valid input such as 12L: GET request to /api/convert',function(done){
    let input = '12L'
    chai
    .request(server)
    .get(`/api/convert?input=${input}`)
    .end(function(err, doc){
        if(err){
            console.log(err)
            done()
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body,responses[input])
        done()
    })
   })

   test('Convert an invalid input such as 32g: GET request to /api/convert',(done)=>{
    
    let input = '32g'
    chai
    .request(server)
    .get(`/api/convert?input=${input}`)
    .end((err, doc)=>{
        if(err){
            console.log(err)
            done()
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.text,responses[input])
        done()
    })
   })

   test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert',(done)=>{
    
    let input = '3/7.2/4kg'
    chai
    .request(server)
    .get(`/api/convert?input=${input}`)
    .end((err, doc)=>{
        if(err){
            console.log(err)
            done()
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.text,responses[input])
        done()
    })
   })

   test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert',(done)=>{
    
    let input = '3/7.2/4kilomegagram'
    chai
    .request(server)
    .get(`/api/convert?input=${input}`)
    .end((err, doc)=>{
        if(err){
            console.log(err)
            done()
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.text,responses[input])
        done()
    })
   })

   test('Convert with no number such as kg: GET request to /api/convert',(done)=>{
    
    let input = 'kg'
    chai
    .request(server)
    .get(`/api/convert?input=${input}`)
    .end((err, doc)=>{
        if(err){
            console.log(err)
            done()
        }
        assert.equal(doc.status, 200);
        assert.deepEqual(doc.body,responses[input])
        done()
    })
   })

   


});
