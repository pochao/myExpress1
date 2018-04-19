var http2 = require('https');

exports.getToken = function () {
  var dataString = "client_id=" + process.env.FORGEID + "&client_secret=" + process.env.FORGEPASSWORD + "&grant_type=client_credentials&scope=data:read";
  console.log(dataString);
  var headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  var options = {
    host: "developer.api.autodesk.com",
    port: 443,
    path: "/authentication/v1/authenticate",
    method: "POST",
    headers: headers,

    // only for dev!
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  };


  var req = http2.request(options, function (res) {
    res.setEncoding("utf8");
    var responseString = "";

    res.on("data", function (data) {
        responseString += data;
    });

    res.on("end", function () {
        console.log(responseString);
        var ores = JSON.parse(responseString);
        
        return ores.access_token;
    });
  });

}
