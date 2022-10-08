import { User } from "../../../lib/models"
import { hash } from "bcryptjs"
import constants from "../../../lib/utils/constants"

export default async function handler(req, res) {
    if(req.method!="POST")
        res.status(400).json({
            STATUS: constants.FAILED,
            MESSAGE: constants.INVALID_METHOD
        })
    const body = req.body
    body.password = hash(body.password,process.env.SALT)
    const user = User.fromJSON(body)
    res.status(200).json(await user.write())
}