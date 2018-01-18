var observe = require('./observe');

`
<div>
  <span>{{ a }}</span>
  <span>{{ b.c }}</span>
</div>
`
global.watcher = null;
var vm = { a: 1, b: { c: 3 } };
observe(vm); // 劫持

// exp: a
// exp: b.c
function watch(vm, exp, callback) {
  let update = () => {
    var val = exp.split('.').reduce((o, k) => o[k], vm);
    callback(val);
  };

  global.watcher = update;
  update();
  global.watcher = null;
}

watch(vm, 'a', function(val) {
  console.log('current a:', val);
});

watch(vm, 'b.c', function(val) {
  console.log('current b.c:', val);
});

watch(vm, 'b.d', function(val) {
  console.log('current b.d:', val);
});

vm.a += 1;
vm.b.c += 1;
vm.b = { d: 5 };
vm.b.d;
