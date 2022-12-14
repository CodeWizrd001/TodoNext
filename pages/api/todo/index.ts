import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../util/db"
import { ResponseFuncs } from "../../../util/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const catcher = (error: Error) => res.status(400).json({ error })

    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            res.json(await Todo.find({}).catch(catcher))
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Todo } = await connect()
            const data = JSON.parse(req.body)
            res.json(await Todo.create(data))
        }
    }

    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "BAD_REQUEST" })
}

export default handler