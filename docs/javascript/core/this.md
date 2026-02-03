# this

在JavaScript中，this是一个关键字，它在不同的执行上下文中指向不同的对象。理解this的指向是JavaScript中一个重要的概念。

## 绑定规则

this的绑定规则有以下几种：

### 默认绑定

在独立函数调用中，this指向全局对象（在浏览器中是window，在Node.js中是global）。但在严格模式下，this会是undefined。

```js
function show() {
    console.log(this); // 浏览器中：window，Node.js中：global
}
show(); // 非严格模式下，this指向全局对象
```

### 隐式绑定

当函数作为对象的方法调用时，this指向调用该函数的对象。

```js
const obj = {
    name: '张三',
    sayName() {
        console.log(this.name); // this指向obj
    }
};
obj.sayName(); // 输出：张三
```

### 显式绑定

通过call、apply或bind方法可以显式地设置this的指向。

```js
function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}

const person = { name: '李四' };

// call：立即调用，参数逐个传递
greet.call(person, '你好'); // 你好, 李四

// apply：立即调用，参数以数组传递
greet.apply(person, ['你好']); // 你好, 李四

// bind：返回新函数，稍后调用
const boundGreet = greet.bind(person, '你好');
boundGreet(); // 你好, 李四
```

### new绑定

当使用new关键字调用构造函数时，this指向新创建的对象。

```js
function Person(name) {
    this.name = name;
}
const p = new Person('王五');
console.log(p.name); // 王五
```

## 常见问题及解决方案

### 丢失this绑定

```js
const obj = {
    name: '张三',
    sayName() {
        console.log(this.name);
    }
};

const fn = obj.sayName;
fn(); // undefined，this丢失

// 解决方案：使用bind
const boundFn = obj.sayName.bind(obj);
boundFn(); // 张三
```

### 回调函数中的this

```js
const obj = {
    name: '张三',
    delayedGreet() {
        setTimeout(function() {
            console.log(this.name); // undefined，this指向window/global
        }, 100);
    }
};

// 解决方案1：保存this
delayedGreet() {
    const self = this;
    setTimeout(function() {
        console.log(self.name); // 张三
    }, 100);
}

// 解决方案2：使用箭头函数
delayedGreet() {
    setTimeout(() => {
        console.log(this.name); // 张三
    }, 100);
}

// 解决方案3：使用bind
delayedGreet() {
    setTimeout(function() {
        console.log(this.name); // 张三
    }.bind(this), 100);
}
```