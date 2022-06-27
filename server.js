const os = require("os")
const express = require("express")
const pug = require("pug")
const humanize = require("humanize")

var app = express()

app.set("view engine", "pug")

app.use(express.static("public"))

app.get("/", function(req,res){
    res.render("memgraph", {
        title: "Memory Info",
        usedMem: "Memory Info"
    })
})

app.get("/data/memory/:type", function(req, res){
    res.setHeader("Content-Type", "application/json")
    switch (req.params.type ) {
        case "free":
            res.send(JSON.stringify({
                t: Date.now(),
                m: os.freemem()
            }))
            break;
        case "used":
            res.send(JSON.stringify({
                t: Date.now(),
                m: (os.totalmem() - os.freemem())
            }))
            break;
        case "total":
            res.send(JSON.stringify({
                t: Date.now(),
                m: os.totalmem()
            }))
            break;    
    }
})

var listener = app.listen(3030, function(){
    console.log("App listening on port " + listener.address().port)
})