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

router.get("/", (req, res) => { //GET http://localhost:3001/movies/name=Diego (all movies named Diego)
    const moviesDB = readFile("movies.json")

    if(req.query && req.query.name){
        const filteredmovies = moviesDB.filter(
            (movie) => movie.hasOwnProperty("name") && movie.name === req.query.name
        )
        res.send(filteredmovies)
    } else {
        res.send(moviesDB)
    }
})

router.get("/:id", (req, res) => {//GET http://localhost:3001/movies/1237 (specific movie named 1237)
    const moviesDB = readFile("movies.json")
    const retrievedmovie = moviesDB.filter((movie) => movie.ID === req.params.id) 
        res.send(retrievedmovie)
})

router.post("/", (req, res) => {
    //POST http://localhost:3001/movies/

    const moviesDB = readFile("movies.json")
    const newmovie = { ...req.body, ID: uniqid(), createAt: new Date()} //... mean take every property and add it here

    moviesDB.push(newmovie)

    fs.writeFileSync(path.join(__dirname, "movies.json"), moviesDB)
    res.status(201).send(newmovie)
})

router.put("/:id", (req, res) => {
    const moviesDB = readFile("movies.json")
    const newDB = moviesDB.filter(movie => movie.ID !== req.params.id)
    newDB.push(modifiedmovie)
    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDB))
    res.status(201).send(newDB)
})

router.delete("/:id", (req, res) => {
    const moviesDB = readFile("movies.json")
    const newDB = moviesDB.filter(movie => movie.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDB))
    res.status(201).send(newDB)
})
module.exports = router