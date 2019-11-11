import express from 'express'
import routerCharla from './charlas'
// import routerExpositor from './expositor'

var router = express.Router()
router.use('/charla', routerCharla)
// router.use('expositor', routerExpositor)

export default router