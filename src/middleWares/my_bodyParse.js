import queryString from 'querystring'

export  default function (req, res, next) {

    if( req.method.toLowerCase() === 'get') return next()

    if (req.headers["content-type"].startsWith('multipart/form-data')) return next()

    let data = ''
    //chunk 二进制数据
    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        req.body = queryString.parse(data)
        next()
    })

    }
