import http from 'http';
import fs from 'fs';
import ejs from 'ejs';
import url from 'url';
import path, { parse } from 'path';

const pathMap = [
    {"path":"/", func:index},
    {"path":"/calc", func:calc},
    {"path":"/calc_result", func:calc_result},
];

let server = http.createServer((request, response) => {
    let pathName = url.parse(request.url, true).pathname;

    if(request.method == "GET") {
        let idx = pathMap.findIndex(item => item.path == pathName);
        if(idx!=-1) pathMap[idx].func(request, response);
        console.log(idx);
    }
    else if(request.method == "POST") {

    }
    else {
        response.writeHead(200, {"Content-Type":"text/html"});
        response.end("<h1>nooooooo</h1>");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("http://127.0.0.1:3000 start");
});

function index(request, response) {
    console.log(path.resolve());
    fs.readFile(path.resolve()+'/../0208html/index.html', "utf-8", (error, data) => {
        if(error) {
            console.log("cannot find file");
            return;
        }
        console.log(data);
        let result = ejs.render(data);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(result);
    });
 

}

function calc(request, response) {
    fs.readFile(path.resolve()+'/../0208html/calc.html', "utf-8", (error, data) => {
        if(error) {
            console.log("cannot find file");
            return;
        }
        let result = ejs.render(data);
        response.writeHead(200, {"Content-Type":"text/html"});
        response.end(result);   
    });
}
function calc_result(request, response) {
    fs.readFile(path.resolve()+'/../0208html/calc_result.html', "utf-8", (error, data) => {
        if(error) {
            console.log("cannot find file");
            return;
        }
        let params = url.parse(request.url, true).query;
        let result;
        if(params.op == "1") result = ejs.render(data, {...params, "op":"+", "result":parseInt(params.x)+parseInt(params.y)});
        else if(params.op == "2") result = ejs.render(data, {...params, "op":"-", "result":parseInt(params.x)-parseInt(params.y)});
        else if(params.op == "3") result = ejs.render(data, {...params, "op":"*", "result":parseInt(params.x)*parseInt(params.y)});
        else if(params.op == "4") result = ejs.render(data, {...params, "op":"/", "result":parseInt(params.x)/parseInt(params.y)});

        response.writeHead(200, {"Content-Type":"text/html"});
        response.end(result);   
    });
}