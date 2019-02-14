
//第一种模块使用方式
// var http_server = require('./http_server');
// http_server.startHttpServer();

//第二种模块使用方式
// var HttpServer = require('./http_server');
// new HttpServer().startHTTPServer();

//获取本机IP地址
var os = require('os'),
    iptable = {},
    ifaces = os.networkInterfaces();
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
        if (details.family == 'IPv4') {
            iptable[dev + (alias ? ':' + alias : '')] = details.address;
        }
    });
}
console.log(iptable);

//https
var https_server = require('./https_server');
https_server.startHttpsServer();
