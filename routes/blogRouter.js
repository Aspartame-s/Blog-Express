var express = require('express');
var router = express.Router();

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET users listing. */
router.get('/list', (req, res, next) => {
    console.log('session: ', req.session)
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    if (req.query.isadmin) {
        if (!req.session.username) {
            //未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

//命中detail路由
router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(detailData => {
        res.json(
            new SuccessModel(detailData)
        )
    })
})

//命中新增路由
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

//命中修改路由
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(data => {
        if (data) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                ErrorModel('更新失败')
            )
        }
    })
})

//命中删除路由
router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = deleteBlog(req.query.id, author)
    return result.then(data => {
        if (data) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                ErrorModel('更新失败')
            )
        }
    })
})



module.exports = router;
