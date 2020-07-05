import Advert from "../models/mong_advert";
import {basename, join} from "path"
import config from "../config"
const formidable = require('formidable');

export function test_get (req, res, next) {
    res.render('aa_test.html')
}
export function test_post (req, res, next) {

    var form = new formidable.IncomingForm();


    form.uploadDir = config.upload_path;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if(err){
            console.log(err)
        }
        var body = fields
        body.image = join('/public/upload', basename(files.image.path))
        var advert = new Advert({
            title:  body.title,
            image:  body.image,
            link:  body.link,
            start_time:  body.start_time,
            end_time:  body.end_time,
        })
        console.log(advert)
        advert.save((err, result) => {
            if(err){
                return next(err)
            }
            res
                .status(200)
                .end(body.image)
        })

    });
}

export function g_adv_list (req, res, next) {
        var current_page = Number.parseInt(req.query.page, 10) || 1
        var num = 5
        Advert.count(function (err, count) {
            if(err){
                return next(err)
            }
            var page_total = Math.ceil(count/num )
            Advert.
            find().
            skip((current_page - 1) * num).
            limit(num).
            exec(function (err, advertList) {
                if(err){
                    return next(err)
                }

                res.status(200).render('advert_list.html', {
                    data: advertList,
                    current_page,
                    page_total
                })
            })
        })


}

export function g_adv_add (req, res, next) {
    res.render('advert_add.html')
}

export function p_adv_add (req, res, next) {

    var form = new formidable.IncomingForm();

    form.uploadDir = config.upload_path;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if(err){
            return next(err)
        }
        var body = fields
        body.image = join('/public/upload', basename(files.image.path))
        var advert = new Advert({
            title:  body.title,
            image:  body.image,
            link:  body.link,
            start_time:  body.start_time,
            end_time:  body.end_time,
        })
        console.log(advert)
        advert.save((err, result) => {
            if(err){
                return next(err)
            }
            res
                .status(200)
                .end(body.image)
        })

    });
}

export function g_adv_upd(req, res, next) {
    Advert.findById(req.params.advertID, function (err, advert_bio) {
        if(err){
            return next(err)
        }
        res.status(200).render('advert_update.html', {
            advert: advert_bio
        })
    })
}

export function p_adv_upd (req, res, next) {
    var body = req.body
    body.last_modified = new Date()
    console.log(body)
    Advert.findOneAndUpdate({_id: body.id}, { $set: body }, function (err, docs) {
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
}

export function g_adv_del (req, res, next) {

    Advert.deleteOne({ _id:req.params.advertID }, function (err) {
        if(err){
            return next(err)
        }
        res.status(200).json({
            err_code: 0
        })
    })
}