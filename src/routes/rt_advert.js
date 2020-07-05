import express from 'express'

import * as advertController from "../controllers/ct_advert"

var router = express.Router()

router.get('/test', advertController
    .test_get
)
router.post('/test', advertController
    .test_post
)


router.get('/advert/list', advertController
    .g_adv_list
)

router.get('/advert/add', advertController
    .g_adv_add
)

router.post('/advert/add', advertController
    .p_adv_add
)

router.get('/advert/update/:advertID', advertController
    .g_adv_upd
)

router.post('/advert/update', advertController
    .p_adv_upd
)

router.get('/advert/delete/:advertID', advertController
    .g_adv_del
)


export default router
