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

# 六.解析body

## 1.安装 koa-body

```
npm i koa-body
```

## 2.注册中间件

改写`app/index.js`

![image-20220523093852204](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220523093852204.png)

## 3.解析请求数据

改写usr.controller.js

```javascript
const { createUser } = require('../service/user.service')

class UserController {

 async register(ctx, next) {

  const res = createUser(ctx.username, ctx.password)

  ctx.body = '用户注册成功'

 }

 async login(ctx, next) {

  ctx.body = '登录成功'

 }
}
module.exports = new UserController()
```

## 4.拆分service层

service层主要是做数据库处理

```javascript
创建src/service/user.service.js

class UserService {

 async createUser(user_name, password) {

  //todo:写入数据库

  return '写入数据库成功'

 }

}

module.exports = new UserService()
```

# 七.集成sequlize

sequelize ORM 数据库工具

ORM: 对象关系映射

- 数据表映射(对应)一个类
- 数据表中的数据行(记录)对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法

## 1.安装 sequelize

```javascript
npm i --save sequelize
npm i mysql2
```

2.连接数据库

```
src/db/seq.js
```

```javascript
const { Sequelize } = require('sequelize')
const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PWD } = require('../config/config.default')
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
})
seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch((err) => {
    console.log('数据库连接失败', err)
  })
module.exports = seq

```

3 编写配置文件

```javascript
APP_PORT=8000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=zdsc
MYSQL_USER=root
MYSQL_PWD=123456
```

八. 创建User模型

1 拆分Model层

sequelize 主要通过Model对应数据表

`创建src/model.user.model.js`

```javascript
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('zd_user', {
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    commit: '用户名 唯一',
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true,
    commit: '密码',
  },
  is_admin: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.BOOLEAN,
    commit: '0 普通管理员 1，超级管理员',
  },
})
// User.sync({ force: true }) //强制同步数据库
module.exports = User

```

九.添加用户数据库

说有数据库的操作都在Service层完成，Service 调用Model完成数据库操作，`改写成src/service/user.service.js`

```javascript
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // User.create({
    //   // 表的字段
    //   user_name: user_name,
    //   password: password
    // })

    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }
}

module.exports = new UserService()
```

同时, 改写`user.controller.js`

```javascript
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

# 十. 错误处理

在控制器中, 对不同的错误进行处理, 返回不同的提示错误提示, 提高代码质量

```javascript
const { createUser, getUerInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    // 合法性
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      }
      return
    }
    // 合理性
    if (getUerInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      }
      return
    }
    // 2. 操作数据库
    const res = await createUser(user_name, password)
    // console.log(res)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
```

在 service 中封装函数

```javascript
const User = require('../model/use.model')

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ user_name, password })
    // console.log(res)

    return res.dataValues
  }

  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()
```

# 十一. 拆分中间件

为了使代码的逻辑更加清晰, 我们可以拆分一个中间件层, 封装多个中间件函数

[![image-20210524154353520](https://camo.githubusercontent.com/c9c69e7a6c7a03c0a8b04971148c33c3363ec421f9cacbbcaef0c1cf3e0a221a/687474703a2f2f696d6167652e62726f6a69652e636e2f696d6167652d32303231303532343135343335333532302e706e67)](https://camo.githubusercontent.com/c9c69e7a6c7a03c0a8b04971148c33c3363ec421f9cacbbcaef0c1cf3e0a221a/687474703a2f2f696d6167652e62726f6a69652e636e2f696d6167652d32303231303532343135343335333532302e706e67)

## 1 拆分中间件

添加`src/middleware/user.middleware.js`

```javascript
const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  if (getUerInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
}
```

## 2 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在 app 中通过`app.on`监听

编写统一的错误定义文件

```javascript
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
}
```

## 3 错误处理函数

```javascript
module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    case '10001':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}
```

改写`app/index.js`

```javascript
const errHandler = require('./errHandler')
// 统一的错误处理
app.on('error', errHandler)
```

# 十二. 加密

在将密码保存到数据库之前, 要对密码进行加密处理

123123abc (加盐) 加盐加密

## 1 安装 bcryptjs

```
npm i bcryptjs
```

## 2 编写加密中间件

```javascript
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}
```

## 3 在 router 中使用

改写`user.router.js`

```javascript
const Router = require('koa-router')

const {
  userValidator,
  verifyUser,
  crpytPassword,
} = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post('/login', login)

module.exports = router
```

# 十三. 登录验证

流程:

- 验证格式
- 验证用户是否存在
- 验证密码是否匹配

改写`src/middleware/user.middleware.js`

```javascript
const bcrypt = require('bcryptjs')

const { getUerInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  // if (await getUerInfo({ user_name })) {
  //   ctx.app.emit('error', userAlreadyExited, ctx)
  //   return
  // }
  try {
    const res = await getUerInfo({ user_name })

    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  // 1. 判断用户是否存在(不存在:报错)
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUerInfo({ user_name })

    if (!res) {
      console.error('用户名不存在', { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}
```

定义错误类型

```javascript
module.exports = {
  userFormateError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: '',
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    result: '',
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配',
    result: '',
  },
}
```

改写路由

```javascript
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
```

# 十四.用户的认证

