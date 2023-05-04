const Router = require('express')
const router = Router()
const taskController = require('../Controller/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', taskController.create)
router.get('/user/:id_user_responsible', taskController.getUserTask)
router.get('/purpose/:id_user_responsible', taskController.getPurposeTask)
router.put('/', taskController.update)


module.exports = router