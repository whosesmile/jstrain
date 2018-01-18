// 属性劫持
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  Object.keys(obj).forEach(key => {
    // 初始
    var oldVal = obj[key];
    // 递归
    observe(oldVal);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        console.log('Get:' + key);
        return oldVal;
      },
      set: function(newVal) {
        if (newVal !== oldVal) {
          oldVal = newVal;
          // 循环
          observe(newVal);
          console.log('Set:' + key);
        }
      }
    });
  });
}

// TEST1
// var vm = { a: 1, b: 2 };
// observe(vm);
// vm.a + vm.b;

// TEST2
// var vm = { a: 1, b: { c: 3 } };
// observe(vm);
// vm.a + vm.b.c;

// TEST3
// var vm = { a: 1, b: { c: 3 } };
// observe(vm);
// vm.b.c = 4;
// vm.b = { c: 5 };
// vm.b.c

// TEST4
// var vm = { a: 1, b: { c: 3 } };
// observe(vm);
// vm.x = 4;
// vm.y
// vm.b.z

// TEST5
// var vm = { a: [{ name: 'lili' }, 1, 2, 3] };
// observe(vm);
// vm.a[0] = { name: 'lucy' };
// vm.a[vm.length] = 5;
