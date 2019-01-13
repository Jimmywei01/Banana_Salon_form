var express = require('express');
var router = express.Router();
// 引入 nodemailer
var nodemailer = require('nodemailer')
// 引入 csurf 防跨站攻擊
var csrf = require('csurf')
// 設定 csurf中間件加入 cookie
var csrfProtection = csrf({
  cookie: true
})

// database firebase_admin module export
var fireData = require('../connections/firebase_admin')
// 驗證
var validator = require('express-validator')
var validatorCheck = require('express-validator/check').check;
var validatorBody = require('express-validator/check').body


// 主頁加入csurf中間件, flash 暫存
router.get('/', csrfProtection, function (req, res) {
  res.render('contact', {
    csrfToken: req.csrfToken(),
    errors: req.flash('errors'), // post 錯誤顯示存在flash
    errors2:req.flash('errors2'),
    errors3:req.flash('errors3'),
    errors4:req.flash('errors4'),
    errors5:req.flash('errors5'),
    errors6:req.flash('errors6')
  });
});


router.get('/review', function (req, res) {
  res.render('contactReview');
});



// 連接 setlists database
router.post('/setlists',function(req,res){
  fireData.ref('setlists').once('value',function(snepshot){
    res.send({
            success:'true',
            result: snepshot.val(),
            message: "資料傳送成功"
      })
  })
})


router.post('/post', ([validatorCheck('email').isEmail()]),csrfProtection, function (req, res) {
var username = req.body.username
var email = req.body.email
var phone = req.body.phone
var date = req.body.date
var dateTime = req.body.dateTime
var item = req.body.item
var description = req.body.description
var errors2 = req.validationErrors()

// flash 判斷使用用者姓名是否為空 暫存資料 flash(key,value)
if (username == '' && errors2 && phone == '' && date == '' && dateTime == '' && item == '') {
  req.flash('errors','請輸入姓名')
  req.flash('errors2', '請輸入連絡信箱')
  req.flash('errors3', '請輸入電話號碼') 
  req.flash('errors4', '請選擇日期')
  req.flash('errors5', '請選擇時間')
  req.flash('errors6', '請選擇預約項目')
  res.redirect('/contact')
} else if (username == '') {
  req.flash('errors', '請輸入姓名')
  res.redirect('/contact')
} else if(errors2){
  req.flash('errors2', '請輸入連絡信箱')
  res.redirect('/contact')
} else if (phone == '') {
  req.flash('errors3', '請輸入電話號碼')
  res.redirect('/contact')
} else if (!(/^\(?(\d{2})\)?[\s\-]?(\d{4})\-?(\d{4})$/.test(phone))) {
  req.flash('errors3', '請輸入電話號碼')
  res.redirect('/contact')
} else if(date == ''){
  req.flash('errors4', '請選擇日期')
  res.redirect('/contact')
} else if(dateTime == ''){
  req.flash('errors5', '請選擇時間')
  res.redirect('/contact')
} else if(item == ''){
  req.flash('errors6', '請選擇預約項目')
  res.redirect('/contact')
}else{

  // 透過哪個 mail 來發信(寄件者)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.gmailUser,
      pass: process.env.gmailPass
    }
  })

  // mail 設定什麼內容
  let mailOptions = {
    from: '', // from 主要是告知「寄件者」是誰所要填寫的欄位，可寫可不寫不影響傳送
    to: 'minserver1990@gmail.com', // 主要這裡設定要傳送給誰
    subject: req.body.username + '寄了一封信', // 解析ejs name 標題
    text: req.body.description + `${req.body.username}要在${req.body.date}的${req.body.dateTime}預約${req.body.item}` // 解析ejs name 文字內容
  }

  // 用設定的 mail 來發信(內容)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
      validator.isEmail('minserver1990@gmail.com');
    } else {
      console.log('Email sent');
    }
  })
  res.redirect(`/contact/review/`) 

  // 資料存到 database
  let pushDtat = fireData.ref('lists').push()
  pushDtat.set({
    username: username,
    email: email,
    phone: phone,
    date: date,
    dateTime: dateTime,
    item: item,
    description: description
  })
  }
});


module.exports = router;
