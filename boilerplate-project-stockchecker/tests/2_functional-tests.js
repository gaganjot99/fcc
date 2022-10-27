const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    let firstNumber;
    test("Viewing one stock: GET request to /api/stock-prices/", (done)=>{
        chai
          .request(server)
          .get("/api/stock-prices?stock=goog")
          .end(function(err, res){
            assert.equal(res.status, 200)
            assert.property(res.body, "stockData")
            assert.property(res.body.stockData, "stock")
            assert.property(res.body.stockData, "price")
            assert.property(res.body.stockData, "likes")
            done()
          })
    })
    test("Viewing one stock and liking it: GET request to /api/stock-prices/", (done)=>{
        chai
          .request(server)
          .get("/api/stock-prices?stock=goog&like=true")
          .end(function(err, res){
            assert.equal(res.status, 200)
            assert.property(res.body, "stockData")
            assert.property(res.body.stockData, "stock")
            assert.property(res.body.stockData, "price")
            assert.property(res.body.stockData, "likes")
            firstNumber = res.body.stockData.likes
            done()
          })
    })
    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", (done)=>{
        chai
          .request(server)
          .get("/api/stock-prices?stock=goog&like=true")
          .end(function(err, res){
            assert.equal(res.status, 200)
            assert.property(res.body, "stockData")
            assert.property(res.body.stockData, "stock")
            assert.property(res.body.stockData, "price")
            assert.property(res.body.stockData, "likes")
            assert.equal(res.body.stockData.likes, firstNumber) //likes same as given in the previous test
            done()
          })
    })
    test("Viewing two stocks: GET request to /api/stock-prices/", (done)=>{
        chai
          .request(server)
          .get("/api/stock-prices?stock=goog&stock=msft")
          .end(function(err, res){
            assert.equal(res.status, 200)
            assert.property(res.body, "stockData")
            assert.typeOf(res.body.stockData, "Array")
            assert.property(res.body.stockData[0], "stock")
            assert.property(res.body.stockData[0], "price")
            assert.property(res.body.stockData[0], "rel_likes")
            assert.property(res.body.stockData[1], "stock")
            assert.property(res.body.stockData[1], "price")
            assert.property(res.body.stockData[1], "rel_likes")
            done()
          })
    })
    test("Viewing two stocks and liking them: GET request to /api/stock-prices/", (done)=>{
        chai
        .request(server)
        .get("/api/stock-prices?stock=goog&stock=msft&like=true")
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.property(res.body, "stockData")
          assert.typeOf(res.body.stockData, "Array")
          assert.property(res.body.stockData[0], "stock")
          assert.property(res.body.stockData[0], "price")
          assert.property(res.body.stockData[0], "rel_likes")
          assert.property(res.body.stockData[1], "stock")
          assert.property(res.body.stockData[1], "price")
          assert.property(res.body.stockData[1], "rel_likes")
          done()
        })
    })

});
