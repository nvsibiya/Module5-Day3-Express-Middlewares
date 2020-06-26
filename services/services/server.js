const express = require("express")
const listEndpoints = require("express-list-endpoints")
const usersRoutes = require("./services/users")
const usersRoutes = require("./services/movies")

const server = express()

const port = process.env.PORT 

server.use(express.json()) //Built in middleware

//Routes

server.listen(port, () => {
    console.log('Server is running on port: ${port}') 
})