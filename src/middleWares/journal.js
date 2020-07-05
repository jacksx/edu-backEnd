import fs from 'fs'

export default function (name) {
    return function (req, res, next) {
        var log = `请求方法: ${req.method}/  请求路径： ${req.url}/  请求时间： ${new Date().toString()}\n`
        fs.appendFile(`./${name}`, log, function (err) {
            if(err){
                return console.log('记录日志失败')
            }
            next()
        })
    }
}