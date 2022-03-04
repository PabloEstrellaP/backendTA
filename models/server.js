import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routerUser from '../routes/user.js'
import routerPermission from '../routes/permissions.js'
import routerRoles from '../routes/roles.js'
import routerUserAuth from '../routes/userAuth.js'
import routerAuth from '../routes/auth.js'
import dbConection from '../database/config.js'
import morgan from 'morgan'
export class Server {
  constructor () {
    this.port = process.env.PORT
    this.app = express()

    this.paths = {
      users: '/api/users',
      permissions: '/api/permissions',
      roles: '/api/roles',
      userAuth: '/api/userAuth',
      auth: '/api/auth'
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
    this.app.use(this.paths.users, routerUser)
    this.app.use(this.paths.permissions, routerPermission)
    this.app.use(this.paths.roles, routerRoles)
    this.app.use(this.paths.userAuth, routerUserAuth)
    this.app.use(this.paths.auth, routerAuth)
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
