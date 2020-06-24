const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

const readFile = (fineName) => {
    const buffer = fs.readFileSync(path.join(__dirname, filename)) 
    // const contentAsAString = buffer.toString() //use these 3 lines if you do not want to use the return JSON.parse(buffer.toString())
    // const contentAsArray = JSON.parse(contentAsAString)
    // return contentAsArray
    return JSON.parse(buffer.toString())

}

router.get("/", (req, res) => { //GET http://localhost:3001/users/name=Diego (all users named Diego)
    const usersDB = readFile("users.json")

    if(req.query && req.query.name){
        const filteredUsers = usersDB.filter(
            (user) => user.hasOwnProperty("name") && user.name === req.query.name
        )
        res.send(filteredUsers)
    } else {
        res.send(usersDB)
    }
})

router.get("/:id", (req, res) => {//GET http://localhost:3001/users/1237 (specific user named 1237)
    const usersDB = readFile("users.json")
    const retrievedUser = usersDB.filter((user) => user.ID === req.params.id) 
        res.send(retrievedUser)
})

router.post("/", (req, res) => {
    //POST http://localhost:3001/users/

    const usersDB = readFile("users.json")
    const newUser = { ...req.body, ID: uniqid(), createAt: new Date()} //... mean take every property and add it here

    usersDB.push(newUser)

    fs.writeFileSync(path.join(__dirname, "users.json"), usersDB)
    res.status(201).send(newUser)
})

router.put("/:id", (req, res) => {
    const usersDB = readFile("users.json")
    const newDB = usersDB.filter(user => user.ID !== req.params.id)
    newDB.push(modifiedUser)
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDB))
    res.status(201).send(newDB)
})

router.delete("/:id", (req, res) => {
    const usersDB = readFile("users.json")
    const newDB = usersDB.filter(user => user.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDB))
    res.status(201).send(newDB)
})
module.exports = router