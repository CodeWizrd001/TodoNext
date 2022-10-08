import getCollection from "./collections"

import { compare } from 'bcryptjs'

// Constants
import constants from "./utils/constants"

class User {
    collectionName = "users"
    name = null
    username = null
    password = null
    active = false
    collection = null

    constructor() {
        this.initialize()
            .then(() => {})
            .catch((e) => {throw e})
    }

    async initialize() {
        this.collection = await getCollection(this.collectionName)
    }

    async fromJSON(data) {
        const user = User()
        user.name = data.name
        user.username = data.username
        user.password = data.password
        user.active = data.active
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

    async getUser(username,password) {
        data = await this.collection.findOne({username: username})
        const checkPassword = compare(password,data.password)
        if(checkPassword) {
            data.STATUS = constants.SUCCESS
            return User.fromJSON(data)
        } else {
            return null
        }
    }

    async write() {
        data = this.toJSON()
        try {
            await this.insert(data)
            return {
                STATUS: constants.SUCCESS
            }
        } catch(e) {
            return {
                STATUS: constants.FAILED,
                MESSAGE: e.toString()
            }
        }
    }

    toJSON() {
        return {
            name: this.name,
            username: this.username,
            password: this.password,
            active: this.active
        }
    }
}

export { User }