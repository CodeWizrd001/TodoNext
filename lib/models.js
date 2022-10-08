import getCollection from "./collections"

import { compare } from 'bcryptjs'

// Constants
import constants from "./utils/constants"

class User {
    collectionName = "users"
    name = null
    password = null
    active = false
    collection = null

    async initialize() {
        this.collection = await getCollection(this.collectionName)
    }

    async insert(data) {
        const res = await this.collection.insert(data)
        if(res) {
            return {
                STATUS: constants.SUCCESS
            }
        } else {
            return {
                STATUS: constants.FAILED
            }
        }
    }

    async getUser(name,password) {
        data = await this.collection.findOne({name: name})
        const checkPassword = compare(password,data.password)
        if(checkPassword) {
            data.STATUS = constants.SUCCESS
        } else {
            return {
                MESSAGE: constants.INVALID_CREDENTIALS
            }
        }
    }
}

export { User }