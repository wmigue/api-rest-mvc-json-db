const { Router } = require('express')
const router = new Router()


const {getItems, addItem, updateItem, deleteItem, getItemById} = require('../controllers/movies') 

router.get('/:id', getItemById)
router.get('/', getItems)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router