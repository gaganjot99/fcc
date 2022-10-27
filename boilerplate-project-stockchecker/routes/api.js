'use strict';
const {getJSON} = require('./connect');


const data = {}

const options = {
  host: 'stock-price-checker-proxy.freecodecamp.rocks',
  port: 443,
  path: '/v1/stock/goog/quote',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

module.exports = function (app) {
  
  app.route('/api/stock-prices')
  .get(function (req, res){
    const params = req.query;
      console.log(params)
      if(typeof params.stock == "object"){
        options.path = '/v1/stock/' + params.stock[0] + '/quote';
        getJSON(options, (status, obj1)=>{
          if(!data[obj1.symbol]){
            data[obj1.symbol] = {likes: 0, ips: []}
          }
          options.path = '/v1/stock/' + params.stock[1] + '/quote';
          getJSON(options, (status, obj2)=>{
            if(!data[obj2.symbol]){
              data[obj2.symbol] = {likes: 0, ips: []}
            }
            if(params.like == true){
              if(!data[obj1.symbol].ips.includes(req.ip)){
                data[obj1.symbol].likes = data[obj1.symbol].likes+1
                data[obj1.symbol].ips.push(req.ip)
              }
              if(!data[obj2.symbol].ips.includes(req.ip)){
                data[obj2.symbol].likes = data[obj2.symbol].likes+1
                data[obj2.symbol].ips.push(req.ip)
              }
            }
            res.json({stockData: [{
              stock: obj1.symbol, price: obj1.latestPrice, rel_likes: data[obj2.symbol].likes-data[obj1.symbol].likes
            },{
              stock: obj2.symbol, price: obj2.latestPrice, rel_likes: data[obj1.symbol].likes-data[obj2.symbol].likes
            }]})
          })
        })
        
      }
      else{
        options.path = '/v1/stock/' + params.stock + '/quote';
        getJSON(options, (status, obj)=>{
          if(!data[obj.symbol]){
            data[obj.symbol] = {likes: 0, ips:[]}
          }
          if(params.like == "true"){
            if(!data[obj.symbol].ips.includes(req.ip)){
              data[obj.symbol].likes = data[obj.symbol].likes+1
              data[obj.symbol].ips.push(req.ip)
            }
          }
          res.json({stockData: {
            stock: obj.symbol, price: obj.latestPrice, likes: data[obj.symbol].likes
          }
        })
        })
      }
    });
    
};
