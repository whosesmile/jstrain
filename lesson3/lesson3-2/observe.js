global = typeof global === undefined ? window : global;

// 发布/订阅
class Emiter {
  constructor() {
    this.subs = [];
  }

  listen() {
    if (global.watcher)
      this.subs.push(global.watcher);
  }

  trigger() {
    this.subs.forEach(sub => sub());
  }
}

// 属性劫持
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  Object.keys(obj).forEach(key => {
    // 利用闭包 给每个key都添加一个发布/订阅组件
    var emiter = new Emiter();

    // 初始
    var oldVal = obj[key];
    // 递归
    observe(oldVal);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        emiter.listen();
        return oldVal;
      },
      set: function(newVal) {
        if (newVal !== oldVal) {
          oldVal = newVal;
          // 循环
          observe(newVal);
          emiter.trigger();
        }
      }
    });
  });
}

module.exports = observe;
