var express = require('express');
var router = express.Router();
const { login } = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    console.log(result)
    return result.then(data => {
        console.log(data)
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel())
            return
        }

        res.json(new ErrorModel('登录失败，请检查用户名和密码1234'))
    })
});

module.exports = router;