

/** 
 * 
 * ＃生成私钥key文件
 openssl genrsa 1024 >  private.key
 
 ＃ 通过私钥文件生成CSR证书签名
 openssl req -new -key private.pem -out csr.pem

 ＃ 通过私钥文件和CSR证书签名生成证书文件
 openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out file.crt

private.pem: 私钥
csr.pem: CSR证书签名
file.crt: 证书文件

*/
/*
openssl genrsa - out mycert.key 2048 - subj / CN = "My CA"
将myCA.cer安装到IOS测试机上， 以此当做内置的受信任根CA， 可以使用airdrop下载安装
openssl req - x509 - new - key myCA.key - out myCA.cer - days 730
openssl req - new - out mycert.req - key mycert.key - subj / CN = 10.0 .210 .53
openssl x509 - req - in mycert.req - out mycert.cer - CAkey myCA.key - CA myCA.cer - days 365 - CAcreateserial - CAserial serial


*/
 var https = require('https');
 var path = require('path');
 var url = require('url');
 var fs = require('fs');
 const hostname = '10.0.210.53';
 const port = 3000;
// var keypath = path.join(__dirname, './certificate/private.key');
// var certpath = path.join(__dirname, './certificate/file.crt');
var keypath = path.join(__dirname, './certificate/mycert.key');
var certpath = path.join(__dirname, './certificate/mycert.cer');
var webpath = path.join(__dirname, './web/');

 function hasSuffix(str, suffix) {
     return str.indexOf(suffix, this.length - suffix.length) !== -1;
 };
function startHttpsServer(){
   
   
    var option = {
        key: fs.readFileSync(keypath, 'utf8'),
        cert: fs.readFileSync(certpath, 'utf8'),
    }
    const https_server = https.createServer(option, handler);


    https_server.listen(port, hostname, () => {
        console.log(`Server running at https://${hostname}:${port}/`);
    });
}
function handler (request, response) {
    // resp.write("hello https_server_start---");
    // resp.end();

    // 解析请求，包括文件名
    var url_query = url.parse(request.url).path;
    // 从文件系统中读取请求的文件内容
    console.log("url_query==" + url_query);

    if (url_query == '/') {
        url_query = webpath + 'index.html';
    } else {
        url_query = webpath + url_query;
    }
    console.log("local_path==" + url_query);

    fs.readFile(url_query, function (err, data) {
        if (err) {
          errHandler(request,response,err);
        } else {
            // HTTP 状态码: 200 : OK
            // Content Type: text/plain
            if (hasSuffix(url_query, 'html')) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data.toString());
            } else if (hasSuffix(url_query, 'png')) {
                response.writeHead(200, {
                    "Content-Type": "image/png"
                });
                response.write(data, 'binary');
            } else {
                response.writeHead(200, "Ok");
                response.write(data, 'binary');
            }
        }
        response.end();
    });

}
function errHandler(request,response,err){
    console.log(err);
    // HTTP 状态码: 404 : NOT FOUND
    // Content Type: text/plain
    response.writeHead(404, {
        'Content-Type': 'text/html'
    });
    response.write("NOT FOUND");
}
//   https://10.0.210.53:3000
//第一种导出模块
exports.startHttpsServer = startHttpsServer;