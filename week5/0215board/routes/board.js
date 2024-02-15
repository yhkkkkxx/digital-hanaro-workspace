var express = require('express');
const parse = require('nodemon/lib/cli/parse');
var router = express.Router();

//데이터 준비
let boardList = [
    {id:1, title:"제목1", writer:"작성자1", contents:"내용1", wdate:"2024-02-15"},
    {id:2, title:"제목2", writer:"작성자2", contents:"내용2", wdate:"2024-02-15"},
    {id:3, title:"제목3", writer:"작성자3", contents:"내용3", wdate:"2024-02-15"},
    {id:4, title:"제목4", writer:"작성자4", contents:"내용4", wdate:"2024-02-15"},
    {id:5, title:"제목5", writer:"작성자5", contents:"내용5", wdate:"2024-02-15"},
];

//  /board
// GET homepage
//app.use('/board', boardRouter); app.js의 이 구문 덕분에
// /board가 항상 따라다닌다
router.get('/', function(req, res, next) {
    //res.send("<h1>Board임</h1>");
    //views/board/board_list.ejs => view 붙어있고 뒤에 ejs 붙고
    //res.render("board/board_list", {});
    res.redirect("/board/list"); //다른 페이지로 이동
    //왜 직접 호출하지 않을까? req 정제 과정을 맡기기 위해
    //redirect:
    //식당에서 손님이 오면 치워주고 자리를 안내한다.
});


//board
//board_list를 해도 이 함수에서 처리가 이루어진다.
router.get('/list', function(req, res, next) {
    //res.send("<h1>Board임</h1>");
    //views/board/board_list.ejs => view 붙어있고 뒤에 ejs 붙고
    res.render("board/board_list", {boardList:boardList});
});
//board/view/1

router.get('/view/:id', function(req, res, next) {
    let id = req.params.id; //view/1 => params
                            //view?id=1 => query.id
    let board = boardList.find(board => board.id == id); //검색

    if(board) res.render("board/board_view",{board:board});
    else res.send("<h1>not found data</h1>");
});

// write 페이지로 이동, 실제로 등록 url
//use -> get/post 둘 다 가능
router.use('/write', function(req, res, next) {
    //GET일 때
    if(req.method == "GET") {
        res.render("board/board_write");
        return;
    }

    //POST일 때
    let body = req.body; //json이라서
    //마지막 데이터의 id값 알아와서 하나 증가
    let id = boardList[boardList.length-1].id;
    id = parseInt(id) + 1; //배열 인덱스 증가
    
    let today = new Date(); //자바스크립트로 현재 날짜와 시간 저장
    body = {...body, id:id, wdate:today.toLocaleDateString()}; 
            //파라미터로 받은 json 원래 데이터에 
            //항목 하나만 추가

    console.log(body);
    boardList.push(body);
    res.redirect("/board/list"); //다른 페이지로 이동
    //지금까지 request 객체로부터 값 받아서 작업했음, 
    //request 무효화하고 페이지 이동을 해야한다. redirect로 이동하자.
});


//중요 => 외부에서 접근 가능
module.exports = router;