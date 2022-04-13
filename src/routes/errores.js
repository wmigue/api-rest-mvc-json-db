const { Router } = require('express')
const router = new Router()


const {errores} = require('../controllers/errores') 

router.get('/', errores)

module.exports = router