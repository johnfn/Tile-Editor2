var util    = require("util"),
    http    = require("http"),
    express = require("express"),
    fs      = require("fs"),

    jade    = require("jade");


var app = express.createServer();


app.register('.html', require('jade'));

app.use(express.bodyDecoder());

app.get('/', function(req, res){
    res.render('index.jade', {layout: false});
});

app.post('/post/', function(req, res){
    map_data = req.body.data;

    fs.writeFile("test", util.inspect(map_data), function(err) {
        if(err) {
            util.puts(err);
        } else {
            util.puts("Saved.");
        }
    }); 


    util.puts(util.inspect(req.body.data));
});

app.use('/', express.staticProvider(__dirname + '/'));
app.use('/css', express.staticProvider(__dirname + '/css'));
app.use('/icons', express.staticProvider(__dirname + '/icons'));
app.use('/js', express.staticProvider(__dirname + '/js'));

util.puts(__dirname);

app.listen(8080);

util.puts("http://localhost:8080");