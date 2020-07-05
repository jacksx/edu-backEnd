import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import err_log from './middleWares/err_log'


import my_bodyParse from "./middleWares/my_bodyParse";
import journal from "./middleWares/journal";

import router from './routes/rt_index'

const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
});
//记录日志中间件
app.use(journal('log.txt'))

app.use(my_bodyParse)

app.use(router)

//记录错误日志
app.use(err_log)

app.listen(8080, function (err) {
    if(!err){
        console.log('server is running...')
    }
})