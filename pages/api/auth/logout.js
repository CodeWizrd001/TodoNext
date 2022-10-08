import constants from "../../../lib/utils/constants"

export default async function handler(req, res) {
    if(req.method!="POST")
        res.status(401).json({
            STATUS: constants.FAILED,
            MESSAGE: constants.INVALID_METHOD
        })
    res.json(200).json({})
}