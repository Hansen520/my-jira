## 学习笔记
### 初始化命令
npx create-react-app name --template typescript
### 其他命令
npx mrm lint-staged 安装lint规范
### mock
> mock数据采用 json-server
>
> 优点: 配置简单，json-server可以0代码30秒启动一个REST API Server
>
> 自定义程度高，一切尽在掌控中，增删查改真实模拟

`npm i json-server -D`

然后在项目文件下创建__json_server_mock__/db.json 文件，然后就可以发起服务了

然后在package里面添加:  `"json-server": "json-server __json_server_mock__/db.json --watch"`

如果 是登入则可以添加中间件校验 

```javascript
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'admin' && req.body.password === '123456') {
      return res.status(200).json({
        user: {
          token: '123',
        },
      });
    } else {
      return res.status(400).json({ message: '用户名或密码错误' });
    }
  }
  next();
};
```

```javascript
// 然后修改
"json-server": "json-server __json_server_mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js"
```



### 添加自定义hook

#### 添加useMount

```javascript
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
```

#### 添加useDebounce

```javascript
// 制作防抖函数
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
```

解析:由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。


### 连接真实的服务器

这是对本课程独家制作的专属服

[地址](npmjs.com/package/jira-dev-tool)

在项目根目录下执行 `npx msw init public`

### JWT原理与auth-provider实现

```javascript
const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;
export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};
```

### 用fetch抽离通用HTTP请求方法，增强通用性

### TS的联合类型、Partial和Omit介绍

#### Type

```javascript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

#### interface与type可互换原则

```javascript
interface Person {
  name: string
}
type Person = { name: string };
const xiaodong: Person = { name: 'xiaodong' };
```

#### interface无法替代type的情况

**例子1**

```typescript

type favoriteNumber = string | number;
let roseFavoriteNumber: favoriteNumber = '6';
// 例子二
// interface 也没法实现Utility type
```

**例子n**看接下来的介绍

#### Parial

`语法：Partial< Type >`

构造一个所有属性的Type设置为optional的类型

简单来说：把 **传入类型Type** 的 **key** 变为 **可选的**

```typescript
type Person = {
    name: string,
    age: number
}

// 需求：Person的属性可传可不传
let xiaoming: Partial<Person> = {}

// 实现原理：传入一个对象，使用keyof遍历该对象的所有key，将key变为可选的
type Partial<T> = {
    [P in keyof T]?: T[P]
}

```

#### Required

`语法：Required< Type >`

构造一个所有属性的Type设置为Required的类型

简单来说：把 **传入类型Type** 的 **key** 变为 **必需的**

```javascript
type Person = {
    name?: string, //可选
    age?: number,  //可选
}

let xiaoming: Required<Person> = { name: 'tao', age: 18 }  //必须要写

实现：
type Required<T> = {
    [P in keyof T]-?: T[P];
}

```

#### Readonly

`语法：Readonly< Type >`

构造一个所有属性的Type设置为onlyRead的类型

简单来说：把 **传入类型Type** 的 **key** 变为 **只读的**

```typescript
type Person = {
    name: string,
    age: number,
}

let xiaoming: Readonly<Person> = { name: 'tao', age: 18 }
xiaoming.age = 20   //赋值报错

// 实现：
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

#### Pick

`语法：Pick<Type, Keys>`

通过Keys从中选择一组属性来构造类型Type

简单来说：从 **传入类型Type** 中把 **Keys** 提取出来

```typescript
type Person = {
  name: string;
  age: number;
};

type PersonOnlyName = Pick<Person, 'name'>;

let gg: PersonOnlyName = {
  name: 'Hansen',
};

// 实现：
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

#### Exclude

`语法：Exclude<Type, ExcludedUnion>`

通过从Type可分配给的所有联合成员中排除来构造类型ExcludedUnion

简单来说：删除不要的属性，从 **Type** 中 **删除ExcludedUnion** 的属性，其他提取出来，如果Type中没有，就全部提取出来

```javascript
type Person = {
    name: string,
    age: number,
    sex: string,
}

type PersonKeys = keyof Person   //PersonKeys: 'name' | 'age'
type Age = Exclude<PersonKeys, 'name' | 'sex'>  //'age'
type All = Exclude<PersonKeys, 'xxx'>  //'name' | 'age' | 'sex'
type All2 = Exclude<PersonKeys, 'xxx' | 'age'>  //'name' | 'sex'

// 实现：
type Exclude<T, U> = T extends U ? never : T;
```

#### Omit

`语法：Omit<Type, Keys>`

通过从中选择所有属性Type然后删除Keys来构造类型

简单来说：删除不要的属性

```javascript
type Person = {
    name: string,
    age: number,
    gender: string,
}

// 需求：只要Person的某个属性，删除不要的属性，不修改原有Person
let xiaoming: Omit<Person, 'name' | 'age'> = { gender: '男' }

// Omit的实现：
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

相关资料

https://blog.csdn.net/weixin_44828005/article/details/120953059

https://blog.csdn.net/weixin_44828005/article/details/119720185

### ant组件库的安装

`yarn add antd`

因为antd要使用less，所以要配合craco去覆盖wepack的配置

命令: `yarn add @craco/craco` 和 `craco-less`

具体文章: https://ant.design/docs/react/use-with-create-react-app-cn















