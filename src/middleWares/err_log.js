import fs from 'fs'

export default function(err, req, res, next){
    var err_msg = `请求方法: ${req.method}/  请求路径： ${req.url}/  错误信息： ${err.message} 请求时间： ${new Date().toString()}\n`
    fs.appendFile(`./err_log.txt`, err_msg , function (err) {
        if(err){
            return console.log('记录日志失败')
        }
    })
    res.status(500)
}