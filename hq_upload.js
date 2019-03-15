var express = require('express');
var path = require('path');
var multer = require('multer');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") 
    res.send(200);/*让options请求快速返回*/
    else next();
  });

app.use(express.static(path.join(__dirname, 'public')));

  
app.get("/",function(req,res){
  res.send("hello");
});

app.post('/uploadimage',function (req, res, next) {
    req.on('data', function (data) {
      console.log("data==" + data);
    });
    req.on('end', function () {
      console.log("uploadimage--end");
      res.send({
        ret_code: '0'
      });
    });
});



// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/"); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    console.log(file);
    cb(null, +Date.now() + '-' + file.originalname);
  }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({
  storage: storage
});
// 单图上传
var imagName = "myImage";//这里的名字要和<input> 标签中的name值保持一致,否则会出现异常
app.post('/uploadimage1', upload.single(imagName), function (req, res, next) {
  res.send({
    ret_code: '0'
  });
});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3006)
console.log('http://127.0.0.1:3006');
