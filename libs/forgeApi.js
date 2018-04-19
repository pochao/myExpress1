
exports.getToken = function () {
  var request = require("request");
  
  var options = { method: 'POST',
    url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    headers: 
     { 'Postman-Token': 'e76f5865-5353-4ea2-b9f3-4675610fa14a',
       'Cache-Control': 'no-cache',
       'Content-Type': 'application/x-www-form-urlencoded' },
    form: 
     { client_id: process.env.FORGEID,
       client_secret: process.env.FORGEPASSWORD,
       grant_type: 'client_credentials',
       scope: 'data:read' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    var ores = JSON.parse(body);
    //console.log(ores.access_token)
    return ores.access_token;
  });

}
