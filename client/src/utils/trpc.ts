import { createReactQueryHooks } from '@trpc/react'
import type { TRPCRouter } from '../../../server/src/router/router'

export const trpc = createReactQueryHooks<TRPCRouter>()
