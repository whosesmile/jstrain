// 插值语法
const reg = /(.*)?\{\{\s*(.*?)\s*\}\}(.*)/;

// 元素节点
function isElement(node) {
  return node.nodeType === 1;
}

// 文本节点
function isTextNode(node) {
  return node.nodeType === 3;
}

// 指令识别
function isDirective(attr) {
  return attr.indexOf('v-') == 0;
}

// 抽离节点
function fragment(el) {
  var frag = document.createDocumentFragment();
  while (child = el.firstChild)
    frag.appendChild(child);
  return frag;
}

// 编译元素
function compileNode(vm, node) {
  Array.from(node.attributes).forEach(attr => {
    var name = attr.name;
    // v-text="a"
    if (isDirective(name)) {
      var exp = attr.value;
      var dir = name.substring(2);
      watch(vm, exp, function(value) {
        console.log(exp, value);
        node.textContent = typeof value == 'undefined' ? '' : value;
      });
      node.removeAttribute(name);
    }
  });
}

// 编译文本
function compileText(vm, node, exp, pre, suf) {
  // {{b}}
  watch(vm, exp, function(value) {
    node.textContent = pre + (typeof value == 'undefined' ? '' : value) + suf;
  });
}

// 编译模板
function compile(el, vm) {
  // 提速运算
  var frag = fragment(el);
  Array.from(frag.childNodes).forEach(node => {
    var text = node.textContent;

    // 元素
    if (isElement(node)) {
      compileNode(vm, node);
    }
    // 文本
    else if (isTextNode(node) && reg.test(text)) {
      compileText(vm, node, RegExp.$2, RegExp.$1, RegExp.$3);
    }

    // 递归
    if (node.childNodes && node.childNodes.length) {
      compile(node, vm);
    }
  });
  // 还原节点
  el.appendChild(frag);
}
