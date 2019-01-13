var express = require('express');
var router = express.Router();
// 引入 csurf 防跨站攻擊
var csrf = require('csurf')
// 設定 csurf中間件加入 cookie
var csrfProtection = csrf({
  cookie: true
})

var fireData = require('../connections/firebase_admin')


// 主頁
// 路由去 database 抓取資料後再用 ejs 將資料render在頁面
router.get('/', csrfProtection, function (req, res, next) {
  fireData.ref('lists').once('value', function (snepshot) {
    var data = snepshot.val()
    res.render('messageBoard', {todoList: data})
  })
})

router.post('/result',function (req, res) {
  fireData.ref('lists').once('value',function(snepshot){
        res.send({
            success:'true',
            result: snepshot.val(),
            message: "資料傳送成功"
      })
  })
})


router.post('/remove',function (req, res) {
  var id = req.body.id
  fireData.ref('lists').child(id).remove()
  .then(function(){
    fireData.ref('lists').once('value',function(snepshot){
      res.send({
            success:'true',
            result: snepshot.val(),
            message: "資料刪除成功"
      })
    })
  })
})




module.exports = router;