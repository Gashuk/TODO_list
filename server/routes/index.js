const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const statusRouter = require('./statusRouter')
const purposeRouter = require('./purposeRouter')
const priorityRouter = require('./priorityRouter')

router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/status', statusRouter)
router.use('/purpose', purposeRouter)
router.use('/priority', priorityRouter)

module.exports = router