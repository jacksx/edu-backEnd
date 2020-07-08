
export function showIndex(req, res, next) {
    var default_bio = {name:'张三', image:'/public/images/monkey.png'}
    var user = req.session.userbio || default_bio
    console.log(user)
    res.render('index.html', {
        user
    })
}