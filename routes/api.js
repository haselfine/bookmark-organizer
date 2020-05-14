let express = require('express')
let db = require('../models') //use models for structure of database, datatypes
let Book = db.Book //retrieve rows from table

let router = express.Router() //initialize express router

router.get('/books', function(req, res, next){ //retrieve all books, sort by priority
    Book.findAll( { order: ['bookPriority'] } ).then( books => {
        return res.json(books)
    }).catch( err => next(err))
})

router.post('/books', function(req, res, next){ //create new book in api
    Book.create( req.body ).then( data => {
        return res.status(201).send(' Created.')
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError){
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        }
        return next(err)
    })
})

router.patch('/books/:id', function(req, res, next){ //update book in api by id
    Book.update( req.body, { where: { id: req.params.id } } )
        .then( rowsModified => {
            if (!rowsModified[0]){
                return res.status(404).send(' Not found')
            } else {
                return res.send(' Updated.')
            }
        }).catch( err => {
            if(err instanceof Sequelize.ValidationError){
                let messages = err.errors.maps( (e) => e.message)
                return res.status(400).json(messages)
            }
            return next(err)
        })
})

router.delete('/books/:id', function(req, res, next){ //remove book from api by id
    Book.destroy( { where: { id: req.params.id } } )
        .then( rowsModified => {
            return res.send(' Deleted.')
        }).catch( err => next(err))
})

module.exports = router