import express, { response } from "express";
import ejs from "ejs";

let app = express();

app.use(express.json()); //parse JSON data -> req.body Object
app.use(express.urlencoded({extended:false})); 
//parse encoded url data
//process received HTML form data
//{extended:false} -> can parse more complicated Object structure


app.use("/", (request, response, next) => {
    console.log("/////////🍀/////////");
    next(); //below function
});

app.use("/hello", (response, request, next) => {
    console.log('hello!!');
    next(); //below function
});

app.get("/get", (request, response) => {
    let data = {name:"kim", age:"250"};
    response.send(data);
    //response .send(data) or .json(data); //use single (can not use with writeHead(...))
});

app.get("/add/:x/:y/:msg", (request, response) => {
    let x = request.params.x;
    let y = request.params.y;
    let msg = request.params.msg;

    response.send({"x":x, "y":y, "result":x+y, "msg":msg});
});

//postman
app.post("/post", (request, response) => {
    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"}); //set header
    response.end("<h1>POST method</h1>");
});

app.post("/userInfo", (request, response) => {
    let name = request.body.name;
    let age = request.body.age;

    response.send({"name":name, "age":age});
});



app.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
});
