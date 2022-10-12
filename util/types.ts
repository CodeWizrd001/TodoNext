// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}
  
// Interface to define our Todo model on the frontend
export interface Todo {
    _id?: number
    title: string
    description: string
    createdBy: number
    completed: boolean
}

export interface User {
    _id?: number
    name: string
    username: string
    password: string
    active: string
}