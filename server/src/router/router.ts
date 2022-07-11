import * as trpc from '@trpc/server'
import { catRouter } from './cat'

export const trpcRouter = trpc.router().merge('cat.', catRouter)

export type TRPCRouter = typeof trpcRouter
