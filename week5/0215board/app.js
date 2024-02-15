var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//외부 파일을 불러온다. routes 폴더 아래 index.js
//users.js 파일이 있는데 각각 url 넘어오면 router들이 별도로 처리 담당
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어들
app.use(logger('dev')); //로그 출력 담당
app.use(express.json()); //json 처리
app.use(express.urlencoded({ extended: false })); //request객체에 body 붙임
app.use(cookieParser()); //쿠키 사용 담당
app.use(express.static(path.join(__dirname, 'public')));
//정적인 웹페이지 - js, css, image, 단순 html 등

//파일 업로드 폴더 만들어서 외부(url로 접근 가능하도록)로 노출하기
//파일을 업로드 할 때는 반드시 물리적 경로가 필요하다.
//물리적 경로는 논리적 경로(url)로 연결시켜야 한다.
// http://127.0.0.1:3000/uploads 했을 때 프로젝트 가동 폴더 /uploads에 
//있는 파일들이 모두 접근 가능하다.
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
//파일관리테이블을 별도로 만들어서 관리한다.
//디비에 동영상이 이미지를 직접 저장할 수도 있는데 
//우리나라는 별도의 폴더를 두고 폴더에 업로드하고, 
//디비에는 위치와 파일명 등 파일을 찾아올 수 있는 정보를 별도로 저장한다.

//게시판에 글을 쓴다. => /board/list   /board/write
//CRUD - create, read, update, delete 단위로 별도의 파일로 가져가자
//라우터라고 부른다. 컨트롤러는 CRUD 당 하나씩
app.use('/', indexRouter); // /로 시작하는 건 index.js가 처리
app.use('/users', usersRouter); // url이 /user로 시작하면 user.js가 처리
app.use('/board', boardRouter); // url이 /board로 시작하면 board.js가 처리

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); //next라는 세번째 매개변수를 통해 
                          //현재 함수의 물리적으로 바로 다음에 있는 함수 호출
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
