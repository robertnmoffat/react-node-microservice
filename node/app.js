const express = require("express");
const bodyParser = require("body-parser");
const port = 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const posts = [];

app.get('/', (req, res) => {
    res.send("request received.");
    console.log("request received.");
});

//-------------create read update delete-------------------
app.get('/messages', (req, res) => {
    res.send(posts);
    console.log("request received.");
});

app.get('/message/:id', (req, res) => {
    let post;
    try {
        post = posts[req.params.id];
    } catch {
        post = undefined;
    } finally {
        res.send(post);
    }
    console.log("request received.");
});

app.put('/message/:id', (req, res) => {
    if (req.params.id < 0 || req.params.id > posts.length) {
        res.send("Failed");
    } else {
        try {
            posts[req.params.id] = req.body;
            res.send("Updated");
        } catch {
            res.send("Failed");
        }
    }
    console.log("request received.");
});

app.post('/message', (req, res) => {
    posts.push(req.body);
    console.log(req.body);
    //res.redirect('/');
    //res.send("Post added.");
});

app.delete('/message/:id', (req, res) => {
    try {
        posts.splice(req.params.id, 1);
        res.send("Success");
    } catch {
        res.send("Failed");
    }
    console.log("request received.");
});

app.listen(port, () => {
    console.log("Listening on port:" + port + "...");
});