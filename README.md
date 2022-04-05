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

然后在 "json-server": "json-server __json_server_mock__/db.json --watch"

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