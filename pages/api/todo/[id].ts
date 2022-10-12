import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../util/db"
import { ResponseFuncs } from "../../../util/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const catcher = (error: Error) => res.status(400).json({ error })

  const id: string = req.query.id as string

  const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.findById(id).catch(catcher))
        },
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(
                await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
        )
        },
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.findByIdAndRemove(id).catch(catcher))
        },
  }

  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "INVALID_METHOD" })
}

export default handler