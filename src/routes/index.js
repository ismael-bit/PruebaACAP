import express from 'express'
import routerCharla from './charlas'
import routerExpositor from './expositor'
import routerExpositor2 from './expositor2'

var router = express.Router()
router.use('/charla', routerCharla)
router.use('/expositor', routerExpositor)
router.use('/expositor2', routerExpositor2)

export default router