import User from "../models/mong_user";
import md5 from "md5-node";
import config from "../config";
import {basename, join} from "path"

export function p_login(req, res, next) {

    var body = req.body
    User.findOne({ email:body.email }, function (err, docs) {
        if(err){
            return next(err)
        }

        if( !docs ) {
            return res.json({
                err_code: 1,
                msg: '账号未注册'
            })
        }
        var temp = md5(md5(body.password))

        if( temp !== docs.password ){
            return  res.json({
                err_code: 2,
                msg: '账号密码错误'
            })
        }
        req.session.userbio = docs
        return res.json({
            err_code: 0,
            msg: 'ok'
        })

    })
}

export function p_signup(req, res, next){

        var form = new formidable.IncomingForm();
        form.uploadDir = config.userAvat_path;
        form.keepExtensions = true;
        console.log(req.url)
        form.parse(req, (err, fields, files) => {

            if (err) {
                return next(err)
            }
            var body = fields
            console.log(body)
            User.find({email: body.email}, function (err, find_user) {
                if(err){
                    return next(err)
                }
                console.log(find_user)
                if(find_user.length !== 0){
                    return res.json({
                        err_code: 1,
                        msg: '邮箱已注册'
                    })
                }
                console.log('find')
                body.password = md5(md5( body.password ))
                body.image = join('/public/user_avatar', basename(files.image.path))
                console.log(body.image)
                var user= new User({
                    name:  body.name,
                    password:  body.password,
                    gender:  body.gender *1,
                    email: body.email,
                    image: body.image
                })
                user.save((err) => {
                    if(err){
                        return next(err)
                    }
                    res
                        .status(200)
                        .json({
                            err_code: 0,
                            msg: body.image
                        })
                })
            })


        });


}