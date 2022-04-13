// Endpoints for external data
const { Router } = require('express')
const router = new Router()

const users = require('../controllers/users')

router.get('/', users)

module.exports = router