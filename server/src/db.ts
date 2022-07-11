import { z } from 'zod'

export const Cat = z.object({
  id: z.number(),
  name: z.string(),
})

export type ICat = z.infer<typeof Cat>

export const db: ICat[] = [
  { id: 1, name: 'cat1' },
  { id: 2, name: 'cat2' },
  { id: 3, name: 'cat3' },
]
