const Router = require('express')
const router = Router()
const statusController = require('../Controller/statusController')

router.get('/', statusController.getAll)
router.post('/', statusController.create)

module.exports = router