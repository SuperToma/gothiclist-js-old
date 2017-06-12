import bodyParser from 'body-parser'
import config from './config.json'
import cookieSession from 'cookie-session'
import createLogger from 'morgan'
import csrfProtect from 'csurf'
import express from 'express'
import flash from 'connect-flash'
import { join as joinPaths } from 'path'
import methodOverride from 'method-override'
import passport from 'passport'
import sequelize from 'sequelize'

sequelize.Promise = Promise

import 'colors'

import mainController from './controllers/main'
import usersController from './controllers/users'

const app = express()
const publicPath = joinPaths(__dirname, 'public')

app.set('view engine', 'jade')

app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride((req) => req.body._method))

if (app.get('env') !== 'test') {
  app.use(createLogger(app.get('env') === 'development' ? 'dev' : 'combined'))
}

app.use(cookieSession({ name: 'gothiclist:session', secret: '$D8i3s~Qva{iV^kN*?zApS]oMsC(F9^{c87%qU_a6J(1M_1vZ)[!3' }))
if (app.get('env') !== 'test') {
  app.use(csrfProtect())
}

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.locals.title = 'Gothiclist'

if (app.get('env') !== 'production') {
  app.locals.pretty = true
}

app.use((req, res, next) => {
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken()
  }
  res.locals.flash = req.flash()
  res.locals.query = req.query
  res.locals.url = req.url
  res.locals.user = req.user
  next()
})

app.use(mainController)
app.use('/users', usersController)

export default app
