

function startHttpServer(){

    var http = require('http');
    var port = 8080;
    var hostname = '10.0.210.53';
    var server = http.createServer(function (request, response) {
        // 响应文件内容
        response.write("Hello-Nodejs");
        response.end();
    });
    server.listen(8080, hostname, function () {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
//第一种导出模块
exports.startHttpServer = startHttpServer;

// 第二种导出模块
// function HttpServer(){
//     this.startHTTPServer = startHTTPServer;
// }
// module.exports = HttpServer;