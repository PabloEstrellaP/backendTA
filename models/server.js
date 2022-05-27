import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from '../routes/user.js'
import permissionRouter from '../routes/permissions.js'
import rolesRouter from '../routes/roles.js'
import userAuthRouter from '../routes/userAuth.js'
import authRouter from '../routes/auth.js'
import automobileRouter from '../routes/automobiles.js'
import housingSectorRouter from '../routes/housingSector.js'
import divisionRouter from '../routes/division.js'
import ITRouter from '../routes/informatic.js'
import dbConection from '../database/config.js'
import morgan from 'morgan'
export class Server {
  constructor () {
    this.port = process.env.PORT || 3000
    this.app = express()

    this.paths = {
      users: '/api/users',
      permissions: '/api/permissions',
      roles: '/api/roles',
      userAuth: '/api/userAuth',
      auth: '/api/auth',
      automobile: '/api/automobile',
      housingSector: '/api/housingSector',
      it: '/api/it',
      division: '/api/division'
    }

    this.conectDB()

    this.middlewares()
    this.routes()
  }

  async conectDB () {
    try {
      await dbConection()
    } catch (error) {
      console.log(error)
    }
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(morgan('dev'))
  }

  routes () {
    this.app.use(this.paths.users, userRouter)
    this.app.use(this.paths.permissions, permissionRouter)
    this.app.use(this.paths.roles, rolesRouter)
    this.app.use(this.paths.userAuth, userAuthRouter)
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.automobile, automobileRouter)
    this.app.use(this.paths.housingSector, housingSectorRouter)
    this.app.use(this.paths.it, ITRouter)
    this.app.use(this.paths.division, divisionRouter)
  }

  async getLocalIp () {
    return import('os')
      .then((os) => {
        const networkInterfaces = os.networkInterfaces()
        console.log(networkInterfaces)
        const ipv4 = networkInterfaces.Ethernet.find(network => network.family === 'IPv4')

        return ipv4.address
      }).catch(err => {
        console.log(err)
      })
  }

  listen () {
    console.clear()

    this.app.listen(this.port, () => {
      console.log(' -------------------------------------------------')
      console.log(`|  💻 Server runing on port ${this.port}.                 |`)
      console.log(`|  You can watch here: http://localhost:${this.port}/     |`)
      console.log('|                   Endpoints                     |')
      console.log(`|  http://localhost:${this.port}${this.paths.users}/               |`)
      console.log(`|  http://localhost:${this.port}${this.paths.permissions}/         |`)
      console.log(`|  http://localhost:${this.port}${this.paths.roles}/               |`)
      console.log(`|  http://localhost:${this.port}${this.paths.userAuth}/            |`)
      console.log(`|  http://localhost:${this.port}${this.paths.auth}/                |`)
      console.log(`|  http://localhost:${this.port}${this.paths.automobile}/          |`)
      console.log(`|  http://localhost:${this.port}${this.paths.housingSector}/       |`)
      console.log(`|  http://localhost:${this.port}${this.paths.it}/                  |`)
      console.log(`|  http://localhost:${this.port}${this.paths.division}/            |`)
    })

    // Run local server
    if (process.env.NODE_ENV === 'development') {
      this.getLocalIp()
        .then(ip => (
          this.app.listen(this.port, ip, () => {
            console.log('|                                                 |')
            console.log('|  📡 Server runing on local network.             |')
            console.log(`|  You can watch here: http://${ip}:${this.port}/  |`)
            console.log(' ------------------------------------------------- ')
          })
        ))
    }
  }
}
