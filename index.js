var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var db = require('pg-db')();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/comments', function (request, response) {
    var anchor = request.query.anchor;
    var url = request.query.url;

    console.log("looking for anchor:", anchor);

    db.query("SELECT * FROM comments WHERE url = :url AND anchor = :url",
        url, anchor,
        function(err, row) {
           response.send(JSON.stringify(row));
        }
    )
});



app.get('/', function(request, response) {
    response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
