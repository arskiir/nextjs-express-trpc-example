import { z } from 'zod'
import * as trpc from '@trpc/server'
import { Cat, db } from '../db'

const getNewId = (): number => {
  return Math.floor(Math.random() * 10_000)
}

export const catRouter = trpc
  .router()
  .query('cats', {
    output: z.array(Cat),
    resolve() {
      return db
    },
  })
  .mutation('createCat', {
    input: z.object({
      name: z.string(),
    }),
    output: Cat,
    resolve({ input: { name } }) {
      const cat = {
        name,
        id: getNewId(),
      }
      db.push(cat)
      return cat
    },
  })
  .mutation('updateCat', {
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    output: Cat,
    resolve({ input: { id, name } }) {
      const cat = db.find((c) => c.id === id)
      if (!cat) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: `Can't find cat with id ${id}`,
        })
      }
      cat.name = name
      return cat
    },
  })
  .mutation('deleteCat', {
    input: z.object({
      id: z.number(),
    }),
    output: Cat,
    resolve({ input: { id } }) {
      const cat = db.find((c) => c.id === id)
      if (!cat) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: `Can't find cat with id ${id}`,
        })
      }
      db.splice(db.indexOf(cat), 1)
      return cat
    },
  })
