var express = require('express');
var router = express.Router();
const { login } = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        console.log(data)
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel())
            return
        }

        res.json(new ErrorModel('登录失败，请检查用户名和密码'))
    })
});

router.get('/login-test', (req, res, next) => {
    console.log(req.session)
    if(req.session.username) {
        res.json({
            errno: 0,
            msg: '登录成功'
        })
        return
    }
    res.json({
        errno: 1,
        msg: '未登录'
    })
})

// router.get('/test-session', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;