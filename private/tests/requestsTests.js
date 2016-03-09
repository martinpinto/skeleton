var http = require('http');

var data = {
  meta: {
   function: 'authors',   
   method: 'POST', 
   version: 'v1' 
  },
  data: {
    
  }
};

var options = {
  host: 'localhost',
  path: '/authors/',
  //since we are listening on a custom port, we need to specify it by hand
  port: '8000',
  //This is what changes the request to a POST request
  method: 'POST'
};

var printResponse = function (response, callback) {
   var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    var res = JSON.parse(str);
    console.log(res);
    console.log(res.length);
    setTimeout(callback, 3000);
  });
};

var req = http.request(options, function(response) {
  printResponse(response, function () {
    
  });
  
});

req.write(JSON.stringify(data));
req.end();