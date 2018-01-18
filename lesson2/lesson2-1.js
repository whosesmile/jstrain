var fs = require('fs');
var path = require('path');
var http = require('http');

// 基础
http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}).listen(8080);

// TEXT
// http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('<strong style="color:#f00">Hello, World!</strong>');
// }).listen(8080);

// HTML
// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('<strong style="color:#f00">Hello, World!</strong>');
// }).listen(8080);

// 文件
// http.createServer(function(req, res) {
//   res.writeHead(200);
//   fs.readFile('./demo1.js', function(err, data) {
//     res.end(data);
//   });
// }).listen(8080);

// IMAGE
// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'image/png' });
//   fs.readFile('./logo.png', function(err, data) {
//     res.end(data);
//   });
// }).listen(8080);

// 路由
// http.createServer(function(req, res) {
//   res.writeHead(200);
//   fs.readFile(path.join(__dirname, req.url.replace(/\?.*/, '')), function(err, data) {
//     res.end(req.url + ':' + req.method + '\n\n\n' + data);
//   });
// }).listen(8080);

// COOKIE, SESSION, ROUTER, TEMPLATE, STATIC, FORM, QUERY, UPLOAD, 404, 500 ...
