var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var bodyParser = require('body-parser');
var db = require('pg-db')();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/comments', function (request, response) {
    var anchor = request.query.anchor;
    var url = request.query.url;

    console.log("looking for anchor:", anchor);
    console.log("looking for url:", url);


    db.query("SELECT * FROM comments WHERE url = :url AND anchor = :anchor",
        {url: url, anchor:anchor},
        function(err, row) {
           response.send(JSON.stringify(row));
        }
    );


});

app.post("/comments", function(request, response){
    db.query("INSERT INTO comments(id, anchor, url, comment) VALUES(DEFAULT, :anchor, :url, :comment)",
        request.body,
        function(err, row) {
            response.send(JSON.stringify(row));
        }
    );
});



app.get('/', function(request, response) {
    response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
