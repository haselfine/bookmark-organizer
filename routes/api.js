let express = require('express')
let Sequelize = require('sequelize')
let db = require('../models')
let Book = db.Book

let router = express.Router()

router.get('/books', function(req, res, next){
    Book.findAll( { order: ['bookPriority'] } ).then( books => {
        return res.json(books)
    }).catch( err => next(err))
})

router.post('/books', function(req, res, next){
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

router.patch('/books/:id', function(req, res, next){
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

router.delete('/books/:id', function(req, res, next){
    Book.destroy( { where: { id: req.params.id } } )
        .then( rowsModified => {
            return res.send(' Deleted.')
        }).catch( err => next(err))
})

module.exports = router