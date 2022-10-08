import constants from "../../../lib/utils/constants"

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    try {
        const session = await getSession()
        console.log("HelloWorld")
        console.log(session)
    } catch(e) {
        console.log("WorldHello")
    }

    if(req.method!="GET")
        res.status(401).json({
            STATUS: constants.FAILED,
            MESSAGE: constants.INVALID_METHOD
        })
    res.json(200).json({})
}