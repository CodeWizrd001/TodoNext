// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/db"

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db("test")
  const collection = db.collection("test")
  let data = await collection.find({}).toArray()
  res.status(200).json({ name: 'John Doe' ,data: data})
}
