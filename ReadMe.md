# 一.项目的初始化

## 1 npm 初始化

```javascript
npm init -y
```

生成 `package.json` 文件

- 记录项目的依赖

## 2 git 初始化

```javascript
git init
```

生成'.git '隐藏文件夹

## 3 创建 ReadMe 文件

# 二、搭建项目

## 1 安装 Koa 框架

npm i koa 

## 2.编写最基本的 app

创建 src/main.js

```javascript
const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
```

## 3.测试

在终端，使用node src/main.js

![image-20220522232639378](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220522232639378.png)

# 三、项目的基本优化

## 1 自动重启服务

安装 nodemon 工具
npm i nodemon -D

编写`package.json`脚本

```javascript
"scripts": {
  "dev": "nodemon ./src/main.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

执行`npm run dev`脚本

![image-20220522233114408](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220522233114408.png)

## 2 读取配置文件

安装 dotenv 读取更目录中的.env 文件,将配置写 process.env 中

```javascript
npm i dotenv
```

创建`.env` 文件

```javascript
APP_PORT=8000
```

创建`src/config/config.default.js`

```javascript
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

改写`main.js`

```javascript
const Koa = require('koa')

const { APP_PORT } = require('./config/config.default')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello api'
})

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

# 四、添加路由

路由：根据不同的url,调用对应的函数

## 1 安装 koa-router

```javascript
npm i koa-router
```

步骤

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 2 编写路由

创建`src/router`目录, 编写`user.route.js`

```javascript
const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

// GET /users/
router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})

module.exports = router
```

## 3 改写 main.js

```javascript
const Koa = require('koa')

const { APP_PORT } = require('./config/config.default')

const userRouter = require('./router/user.route')

const app = new Koa()

app.use(userRouter.routes())

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

# 五、目录结构优化

##  1.将 http 服务和 app 业务拆分

创建`src/app/index.js`

```javascript
const Koa = require('koa')

const userRouter = require('../router/user.route')

const app = new Koa()

app.use(userRouter.routes())

module.exports = app
```

改写`main.js`

```javascript
const { APP_PORT } = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

##  2.将路由和控制器拆分

路由：解析 url,分布给控制器对应的方法
控制器:控制不同的业务

改写`user.route.js`

```javascript
const Router = require('koa-router')

const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
```

创建`controller/user.controller.js`

```javascript
class UserController {
  async register(ctx, next) {
    ctx.body = '用户注册成功'
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

六.解析body

1.安装 koa-body

```
npm i koa-body
```

2.注册中间件

改写`app/index.js`
