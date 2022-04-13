var fs = require('fs')
const path = require('path')

const movies = require(path.join(__dirname, "/../models/sample.json"))
const url_movies = path.join(__dirname, "/../models/sample.json")


const getItems = (req, res) => {
    res.json(movies)
}


const addItem = (req, res) => {
    const id = (movies.length + 1).toString()
    const { title, director, year, rating } = req.body
    const newMovie = { id, ...req.body }
    if (id && title && director && year && rating) {
        // path.join especifica solo la carpeta que contiene el archivo, las demas son /../../../
        fs.readFile(url_movies, 'utf8', function (err, data) {
            if (err) {
                throw err
            }
            //toma una cadena JSON y la transforma en un objeto de JavaScript.
            const objJS = JSON.parse(data)
            let ya_existe = 0
            for (let e of objJS) {
                if (e.title == title || e.id == id) {
                    ya_existe = 1
                }
            }
            if (ya_existe == 1) {
                res.send("ya existe esa pelicula, elegi otra por favor...")
            } else {
                objJS.push(newMovie)
                //toma un objeto de JavaScript y lo transforma en una cadena JSON.
                let cadJSON = JSON.stringify(objJS)
                fs.writeFile(url_movies, cadJSON, function (err) {
                    if (err) return console.log(err)
                    console.log('Note added')
                    res.send("se agrego la pelicula.")
                })
            }

        })
    } else {
        res.status(500).json({ error: 'There was an error.' })
    }
}




const updateItem = (req, res) => {
    const { id } = req.params
    const { title, director, year, rating } = req.body
    if (id && title && director && year && rating) {
        fs.readFile(url_movies, 'utf8', function (err, data) {
            if (err) {
                throw err
            }
            const objJS = JSON.parse(data)
            for (let e of objJS) {
                if (e.id == id) {
                    e.id = id
                    e.title = title
                    e.director = director
                    e.year = year
                    e.rating = rating
                }
                let cadJSON = JSON.stringify(objJS)
                fs.writeFile(url_movies, cadJSON, function (err) {
                    if (err) return console.log(err)
                    res.send("pelicula actualizada...").send(movies)
                })

            }
        })
    } else {
        res.status(500).json({ error: 'There was an error.' })
    }
}



const deleteItem = (req, res) => {
    const { id } = req.params
    if (id) {
        fs.readFile(url_movies, 'utf8', function (err, data) {
            if (err) {
                throw err
            }
            const objJS = JSON.parse(data)
            let pos = undefined
            for (let e of objJS) {
                if (e.id == id) {
                    pos = ((e.id) - 1)
                }
            }
            if (pos) {
                objJS.splice(pos, 1)
                let cadJSON = JSON.stringify(objJS)
                fs.writeFile(url_movies, cadJSON, function (err) {
                    if (err) return console.log(err)
                    res.send("pelicula ELIMINADA...")
                })
            } else {
                res.send("no se encontro ese ID...")
            }
        })
    } else {
        res.status(500).json({ error: 'There was an error.' })
    }
}




const getItemById = (req, res) => {
    const { id } = req.params
    fs.readFile(url_movies, 'utf8', function (err, data) {
        if (err) {
            throw err
        }
        const objJS = JSON.parse(data)
        for (let e of objJS) {
            if (e.id == id) {
                res.send(e)
                break
            }
        }
    })

}

module.exports = { getItems, addItem, updateItem, deleteItem, getItemById }