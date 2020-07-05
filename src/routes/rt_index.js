import router from "./rt_advert";

import * as indexController from '../controllers/ct_index'

router.get('/', indexController
    .showIndex
)

export default router