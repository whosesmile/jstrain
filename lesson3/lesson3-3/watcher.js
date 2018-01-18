function watch(vm, exp, callback) {
  let update = () => {
    // var val = exp.split('.').reduce((o, k) => o[k], vm);
    with(vm) {
      var val = eval(exp);
    }
    callback(val);
  };

  Emiter.watcher = update;
  update();
  Emiter.watcher = null;
}
