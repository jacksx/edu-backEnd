import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import err_log from './middleWares/err_log'
import session from "express-session"

import my_bodyParse from "./middleWares/my_bodyParse";
import journal from "./middleWares/journal";

import adv_router from './routes/rt_index'
import log_router from './routes/rt_log'

const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
});
//记录日志中间件
app.use(journal('log.txt'))

app.use(my_bodyParse)

app.use(adv_router)
app.use(log_router)

//记录错误日志
app.use(err_log)

app.listen(8080, function (err) {
    if(!err){
        console.log('server is running...')
    }
})