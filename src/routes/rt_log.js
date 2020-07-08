import express from 'express'
import {basename, join} from "path"
import md5 from 'md5-node'
import user_cottrollers from '../controllers/ct_user'
const formidable = require('formidable');

import User from "../models/mong_user";
import config from "../config";
import * as user_controllers from "../controllers/ct_user";


var router = express.Router()

router.get('/logIn', (req, res, next) => {
    res.render('signIn.html')
})
router.post('/logIn', user_controllers.
    p_login
)

router.get('/signUp', (req, res, next) => {
    res.render('signUp.html', {
        form: {}
    })
})
router.post('/signUp',user_controllers.
    p_signup
)

router.get('/logOut', (req, res, next) => {
    console.log(req.url);
    req.session.destroy(function (err) {
        if(err) {
            return next()
        }
    })
    res.redirect('/')
})

export default router