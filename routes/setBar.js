var express = require('express');
var router = express.Router();

// 引入 csurf 防跨站攻擊
var csrf = require('csurf')
// 設定 csurf中間件加入 cookie
var csrfProtection = csrf({
  cookie: true
})

var fireData = require('../connections/firebase_admin')


// 路由去 database 抓取資料後再用 ejs 將資料render在頁面
router.get('/', csrfProtection, function (req, res, next) {
  fireData.ref('setlists').once('value', function (snepshot) {
    var data = snepshot.val()
    res.render('setBar',{setlists:data})
  })
})


router.post('/add', function (req, res) {
  var item = req.body.item
  var time = req.body.time
  var money = req.body.money
  var pushData = fireData.ref('setlists').push()
  pushData.set({
    item:item,
    time:time,
    money:money
  })
  .then(function(){
    fireData.ref('setlists').once('value',function(snepshot){
      res.send({
            success:'true',
            result: snepshot.val(),
            message: "資料傳送成功"
      })
    })
  })
})

router.post('/addRemove',function(req,res){
  var id = req.body.id
  fireData.ref('setlists').child(id).remove()
  .then(function(){
    fireData.ref('setlists').once('value', function(snepshot) {
      res.send({
            success:'true',
            result: snepshot.val(),
            message: "資料刪除成功"
      })
    })
  })
})






module.exports = router;