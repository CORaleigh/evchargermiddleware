var app = require("express")();
var http = require("http").Server(app);
var request = require("request-promise");
var parseString = require('xml2js').parseString;
var zlib = require('zlib');


app.get("/", function(req, res) {
    res.end("helloworld!");

});

app.get("/getRank", function(req, res) {
    let srPostBody = "<x rankType='0' period='today' />";
    var options = {
        method: "POST",
        url:
          "http://periscope.raleighnc.gov/periscopeApi/sustainability.getEvRankXml",
          headers: {
            // 'Cookie': "cookie",
            'Content-Type': 'text/xml',
            // 'Content-Length': Buffer.byteLength(srPostBody),
            'accept-encoding': 'gzip, deflate'
           },
        body: srPostBody,
        gzip: true,
        json: false
      };
      
        request(options)
          .then(response => {
            // Handle the response
            console.log("response is ", response);
            // let nom = res.pipe(zlib.createGunzip()).pipe(process.stdout);
            var xml = response;
            parseString(xml, function (err, result) {
                console.log(result.rank.r);
                res.send(result.rank.r);
            });

         
          })
          .catch(err => {
            // Deal with the error
            console.log("error is ", err);
          });
});

http.listen(3000, function() {
    console.log("listening on *:3000");

});