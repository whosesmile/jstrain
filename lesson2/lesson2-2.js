var fs = require('fs');
var path = require('path');
var http = require('http');
var nunjucks = require('nunjucks');
var htmlmin = require('koa-html-minifier');
var koa = require('koa');
var koaBody = require('koa-body');
var session = require('koa-session');
var Router = require('koa-router');

// 初始化KOA
var app = koa();

// TEST

// 基础
app.use(function*() {
  this.body = 'Hello World';
});

// 路由
// var router = new Router();
// router
//   .get('/', function*() {
//     this.body = 'Index Page';
//   })
//   .get('/hello', function*() {
//     this.body = 'Hello Page';
//   });
// app.use(router.routes());

// 文件 - 同步
// var router = new Router();
// router.get('/', function*() {
//   var html = fs.readFileSync('./template.html').toString();
//   this.body = html;
// });
// app.use(router.routes());

// 文件 - 异步
// var router = new Router();
// router.get('/', function*() {
//   var html = yield new Promise(function(resolve, reject) {
//     fs.readFile('./template.html', function(e, data) {
//       if (e) reject(e);
//       resolve(data.toString());
//     });
//   });
//   // var html = (yield toPromise(fs.readFile)('./template.html')).toString();
//   this.body = html;
// });
// app.use(router.routes());

// 原生模板
// var router = new Router();
// router.get('/', function*() {
//   var html = (yield toPromise(fs.readFile)('./template.html')).toString();
//   var name = '张三';
//   var age = 18;
//   html = eval('`' + html + '`');
//   this.body = html;
// });
// app.use(router.routes());

// 模板
// config template
// var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['.'], {
//   watch: true, // 当文件改变 重新加载
// }));
// var router = new Router();
// router.get('/', function*() {
//   // var html = env.render('./template.html', {
//   var html = env.render('./nunjucks.html', {
//     name: '张三',
//     age: 18,
//     list: [1, 2, 3, 4, 5],
//   });
//   this.body = html;
// });
// app.use(router.routes());

// // KOA 执行原理
// // config template
// var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['.'], {
//   watch: true, // 当文件改变 重新加载
// }));
// var router = new Router();
// router.get('/', function*() {
//   // var html = env.render('./template.html', {
//   var html = env.render('./nunjucks.html', {
//     name: '张三',
//     age: 18,
//     list: [1, 2, 3, 4, 5],
//   });
//   this.body = html;
// });
// // 压缩HTML
// // app.use(htmlmin({
// //   minifyJS: true,
// //   minifyCSS: true,
// //   collapseWhitespace: true,
// //   keepClosingSlash: true,
// //   removeComments: true,
// // }));
// app.use(router.routes());
// app.use(function*(next) {
//   console.log(1);
//   yield * next;
//   console.log(2);
// });

// // KOA 执行原理
// var router = new Router();
// router.get('/', function*() {
//   this.body = '我是真的';
// });
// app.use(function*(next) {
//   yield next;
//   this.body = '我是假的';
// });
// app.use(router.routes());

// // POST
// var router = new Router();
// router
//   .get('/', function*() {
//     this.body = `
//       <html>
//         <form method="post" action="/save?age=18">
//           <input type="text" name="name" />
//           <button>提交</button>
//         </form>
//       </html>`;
//   })
//   .post('/save', function*() {
//     var query = this.query;
//     var form = this.request.body;
//     this.body = `我叫${form.name}，我今年${query.age}岁了`;
//   });
// app.use(koaBody());
// app.use(router.routes());

// // SESSION COOKIE SIGNED
// app.keys = ['some secret hurr'];
// var CONFIG = {
//   key: 'koa:sess', // (string) cookie key (default is koa:sess)
//   maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
//   overwrite: true, // (boolean) can overwrite or not (default true)
//   httpOnly: true, // (boolean) httpOnly or not (default true)
//   signed: false, // (boolean) signed or not (default true)
// };
// app.use(session(CONFIG, app));

// app.use(function*(next) {
//   this.session.count = (this.session.count || 0) + 1;
//   this.body = `你访问了此网站：${ this.session.count }次`;
// });

// 工具方法
function toPromise(fn) {
  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      fn.apply(null, Array.from(args).concat(function(e, data) {
        if (e) reject(e);
        resolve(data);
      }));
    });
  };
}

app.listen(8080);
// http.createServer(app.callback()).listen(8080);
