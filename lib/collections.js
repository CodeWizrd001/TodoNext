import clientPromise from "./db"

async function getCollection(collectionName) {
    const client = await clientPromise
    const db = await client.db()
    const collection = await db.collection(collectionName)
    return collection
}

export default getCollection