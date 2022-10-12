import mongoose, { Model } from "mongoose"

const DATABASE_URL : string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err : any) => console.log(err))

  const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: Number,
    completed: Boolean,
  })

  const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
  })

  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
  const User = mongoose.models.User || mongoose.model("User", UserSchema)

  return { conn, Todo , User}
}