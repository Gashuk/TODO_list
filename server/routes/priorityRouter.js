const Router = require('express')
const router = Router()
const priorityController = require('../Controller/priorityController')

router.post('/', priorityController.create)
router.get('/', priorityController.getAll)

module.exports = router