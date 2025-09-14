# JavaScript 基础教程

JavaScript是现代Web开发的核心语言，本文将介绍JavaScript的基础知识。

## 变量声明

```javascript
// let 和 const
let name = 'John';
const age = 25;

// var (不推荐在新代码中使用)
var city = 'New York';
```

## 数据类型

| 类型 | 示例 | 说明 |
|------|------|------|
| String | `'hello'` | 字符串 |
| Number | `42` | 数字 |
| Boolean | `true` | 布尔值 |
| Array | `[1, 2, 3]` | 数组 |
| Object | `{name: 'John'}` | 对象 |
| Null | `null` | 空值 |
| Undefined | `undefined` | 未定义 |

## 函数

### 函数声明
```javascript
function add(a, b) {
    return a + b;
}
```

### 箭头函数
```javascript
const multiply = (a, b) => a * b;
```

### 回调函数
```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback('Data received');
    }, 1000);
}
```

## 异步编程

### Promise
```javascript
function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'John', age: 30 });
        }, 1000);
    });
}

fetchUserData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Async/Await
```javascript
async function getUserData() {
    try {
        const data = await fetchUserData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

## 数组操作

```javascript
const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(n => n * 2);

// filter
const even = numbers.filter(n => n % 2 === 0);

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## 对象操作

```javascript
const person = {
    name: 'Alice',
    age: 25,
    city: 'Beijing'
};

// 解构
const { name, age } = person;

// 扩展运算符
const updatedPerson = { ...person, age: 26 };
```

## 错误处理

```javascript
try {
    // 可能出错的代码
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('操作失败:', error.message);
} finally {
    console.log('清理工作');
}
```

## 现代JavaScript特性

### 可选链操作符
```javascript
const user = {
    profile: {
        name: 'John'
    }
};

console.log(user?.profile?.name); // John
console.log(user?.address?.city); // undefined
```

### 空值合并操作符
```javascript
const input = null;
const value = input ?? 'default'; // 'default'
```

---

掌握这些基础知识将为你的JavaScript之旅打下坚实基础！