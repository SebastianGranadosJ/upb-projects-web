import express, { Application } from 'express'
import path from 'path'

import ErrorRouter from './error/router/ErrorRouter'

import ErrorView from './error/view/ErrorView'
import NewsRouter from './news/router/NewsRouter'
import NewsModel from './news/model/NewsModel'
import NewsView from './news/view/NewsView'

export default class Server {
  private readonly app: Application

  constructor(
    private readonly newsRouter: NewsRouter,
    private readonly errorRouter: ErrorRouter
  ) {
    this.app = express()
    this.configure()
    this.static()
    this.routes()
  }

  private readonly configure = (): void => {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.set('view engine', 'ejs')
    this.app.set('views', path.join(__dirname, './template'))
  }

  private readonly routes = (): void => {
    this.app.use('/news', this.newsRouter.router)
    this.app.use('/{*any}', this.errorRouter.router)
  }

  private readonly static = (): void => {
    this.app.use(express.static(path.join(__dirname, './public')))
  }

  readonly start = (): void => {
    const port = 1888
    const host = 'localhost'
    this.app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`)
    })
  }
}

const server = new Server(
  new NewsRouter(new NewsView(new NewsModel())),
  new ErrorRouter(new ErrorView())
)
server.start()
