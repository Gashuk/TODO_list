const Router = require('express')
const router = Router()
const purposeController = require('../Controller/purposeController')

router.post('/', purposeController.create)
router.get('/user/:id_user_supervisor', purposeController.getUserPurpose)

module.exports = router