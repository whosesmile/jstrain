/**
 * 数组的一些细节
 */

// 预先分配长度的数组方法1
var list = new Array(5);

// 预先分配长度的数组方法2
var list = [];
list.length = 5;

// 假设我要创建一个长度为100的数组，默认填充1-100

// 错误的方法:
var list = new Array(100).map(i => i + 1);
console.log(list);

// 为什么？
// 静态语言的数组是预先分配一段连续的内存，因为数组的元素类型是固定的，这样每个元素的内存大小是可以继续计算的
// 所以通过索引获取数组元素的值，就只要拿到初始指针，然后用下标与单元内存相乘，就得到了对应的元素指针
// 同时由于静态语言的数组寻址是需要连续内存的，所以数组的大小一经定义就不可更改
// 也因为如此，静态语言中基于数组实现的链表结构，如果预先分配内存空间很小，当超过连续分配的内存空间，就要做重新创建数组，搬移所有的值。
// 而如果内存分配的很大，又会浪费，所以根据业务需要，做一个取舍。

// 现在很明显：JS中不存在传统意义上的数组，因为JS的数组可以存放任意的值
// JS的数组是一个{key, value}的对象，它的父类是Object
console.log([] instanceof Object)

// 这意味着什么？
// 我们可以给list任意添加属性
var list = [];
list[0] = 0;
list[1] = 1;
list.x = 'x';
list.y = 'y';

for (k in list) {
  console.log(k);
}
console.log('\n');
Object.keys(list).forEach(k => console.log(k));
console.log('\n');
list.forEach(k => console.log(k));
// 结论：使用for in循环或keys遍历数组是个坏习惯，尤其是你在使用他人提供的类库的时候
// 给数组添加非下表索引方法也是个坏习惯

// 上面的例子证明了数组的下标就是对象的key，数组的forEach、filter、map等方法只是用来迭代数字key，而不会迭代其他类型的键
// 但是既然是迭代key，这也意味着当我们定义数组的时候，我们如果不指定键，那么就无法遍历，因为key不存在

console.log(Object.keys(new Array(100)));

// 再来考虑数组的长度
var list = [];
list[0] = 0;
list.x = 'x';
list.y = 'y';
console.log(list.length);
console.log(Object.keys(list).length);

// 回到刚才的例子，如果我们要写一个方法叫 range，返回自然数

function range(l = 0, s = 1) {
  let list = [];
  for (let i = 0; i < l; i++) {
    list[i] = s + i;
  }
  return list;
}

console.log(range(10));
console.log(range(10, 101));

// 如果使用ES6，可以填充单一值
console.log(new Array(10).fill(1));

// 关于key的排序问题
var x = { a: 1, b: 2 };
var y = { b: 2, a: 2 };

console.log(JSON.stringify(x));
console.log(JSON.stringify(y));
console.log(Object.keys(x));
console.log(Object.keys(y));

var x = { 1: 'a', 2: 'b' };
var y = { 2: 'b', 1: 'a' };

console.log(JSON.stringify(x));
console.log(JSON.stringify(y));
console.log(Object.keys(x));
console.log(Object.keys(y));

// 这意味着比对两个对象是否相等，其实并不能通过JSON.stringify转换字符串的方式来取巧
// 因为键的顺序不一定相同，还是需要递归展开树的，除非能够确定对象的定义顺序不会改变

// 数组的父类是Object，继承了这个特性
var list = [];
list.length = 5;
list[3] = 3;
list[0] = 0;
console.log(JSON.stringify(list));
console.log(Object.keys(list));

// 数组的长度有个另外的办法
var list = [];
list[5] = 5;
console.log(list.length);
console.log(JSON.stringify(list));
console.log(Object.keys(list));

// 最后：删除属性操作
var list = [0, 1, 2, 3, 4];
console.log(list.length);
console.log(JSON.stringify(list));
console.log(Object.keys(list));

delete list[0];
console.log(list.length);
console.log(JSON.stringify(list));
console.log(Object.keys(list));

list[2] = undefined;
console.log(list.length);
console.log(JSON.stringify(list));
console.log(Object.keys(list));

delete list[4];
console.log(list.length);
console.log(JSON.stringify(list));
console.log(Object.keys(list));

// 由此延伸：
// 我们可以自己实现类似的数组数据结构
// 比如jQuery对象，现在你应该可以可以理解为什么它有length，可以each,map方法做迭代
// 它自己内部封装而已，实现了许多类似数组的方法而已
// 由于我们无法重载 [] 操作符，所以我们无法做赋值劫持，比如更改length等操作，所以jQuery中添加元素是add而不能通过[]来添加
// 访问: http://qdingnet.com/
var a = $('a:first');
var b = $('a:last');
console.log(a.length);
a.each(k => console.log(k));
a[1] = b;
console.log(a.length);
a.each(k => console.log(k));

var a = $('a:first');
var b = $('a:last');
console.log(a.length);
a.each(k => console.log(k));
a = a.add(b); // jquery会返回新对象，需要重新复制
console.log(a.length);
a.each(k => console.log(k));
