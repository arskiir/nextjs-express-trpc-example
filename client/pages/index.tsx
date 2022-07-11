import type { NextPage } from 'next'
import { FormEvent } from 'react'
import { trpc } from '../src/utils/trpc'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-xl text-gray-100 p-5 md:px-24 md:py-20 lg:px-40 lg:py-20 lg:space-y-20">
      <View />
      <Actions />
    </div>
  )
}

const View = () => {
  const { data, error } = trpc.useQuery(['cat.cats'])
  return (
    <div>
      <h1 className="text-3xl">View</h1>
      <br />
      <h2>Error</h2>
      <pre>{JSON.stringify(error)}</pre>
      <br />
      <h2>Data</h2>
      <ol className="grid grid-cols-2 xl:grid-cols-3">
        {data &&
          data.map(({ id, name }) => {
            return (
              <li key={id}>
                <p>
                  <span className="text-yellow-300">{id}</span>:{' '}
                  <span className="text-blue-300">{name}</span>
                </p>
              </li>
            )
          })}
      </ol>
      <br />
    </div>
  )
}

const Actions = () => {
  return (
    <div>
      <h1 className="text-3xl">Actions</h1>
      <br />
      <div className="space-y-4">
        <Create />
        <Update />
        <Delete />
      </div>
    </div>
  )
}

const Create = () => {
  const utils = trpc.useContext()
  const { mutate: createMutate } = trpc.useMutation(['cat.createCat'], {
    onError: (error) => {
      alert(error.message)
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    if (!name.trim()) return
    createMutate(
      { name },
      {
        onSuccess: () => {
          utils.invalidateQueries(['cat.cats']) // this triggers a refetch
          ;(e.target as HTMLFormElement).reset()
        },
      }
    )
  }

  return (
    <div>
      <h2>Create</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="text-gray-800"
        />
        <button type="submit" className="border px-4 py-1">
          create
        </button>
      </form>
    </div>
  )
}
const Update = () => {
  const utils = trpc.useContext()
  const { mutate: updateMutate } = trpc.useMutation(['cat.updateCat'], {
    onError: (error) => {
      alert(error.message)
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const id = formData.get('id') as string
    const name = formData.get('new-name') as string
    if (!id.trim() || !name.trim()) return
    updateMutate(
      { id: parseInt(id), name },
      {
        onSuccess: () => {
          utils.invalidateQueries(['cat.cats']) // this triggers a refetch
          ;(e.target as HTMLFormElement).reset()
        },
      }
    )
  }
  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <label htmlFor="id">Id</label>
        <input
          type="number"
          name="id"
          id="id"
          required
          className="text-gray-800"
        />
        <label htmlFor="new-name">Name</label>
        <input
          type="text"
          name="new-name"
          id="new-name"
          required
          className="text-gray-800"
        />
        <button type="submit" className="border px-4 py-1">
          update
        </button>
      </form>
    </div>
  )
}
const Delete = () => {
  const utils = trpc.useContext()
  const { mutate: deleteMutate } = trpc.useMutation(['cat.deleteCat'], {
    onError: (error) => {
      alert(error.message)
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const id = formData.get('to-delete-id') as string
    if (!id.trim()) return
    deleteMutate(
      { id: parseInt(id) },
      {
        onSuccess: () => {
          utils.invalidateQueries(['cat.cats']) // this triggers a refetch
          ;(e.target as HTMLFormElement).reset()
        },
      }
    )
  }
  return (
    <div>
      <h2>Delete</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <label htmlFor="to-delete-id">Id</label>
        <input
          type="number"
          name="to-delete-id"
          id="to-delete-id"
          required
          className="text-gray-800"
        />
        <button type="submit" className="border px-4 py-1">
          delete
        </button>
      </form>
    </div>
  )
}

export default Home
