import express, { Application } from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './router/router'

const app: Application = express()

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({})

app.use(express.json())
app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
    createContext,
  })
)

app.listen(8080, () => {
  console.log('Server running on port 8080')
})
