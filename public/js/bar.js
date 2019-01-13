let setItem = document.getElementById('item')
let setTime = document.getElementById('time')
let setMoney = document.getElementById('money')
let setSend = document.querySelector('.setSend')
let changeList = document.querySelector('.changeList')
let send = document.querySelector('.send')

// Ajax 撈 data 回來頁面
send.addEventListener('click', function (e) {
  e.preventDefault()
  let item = setItem.value
  let time = setTime.value
  let money = setMoney.value
var xhr = new XMLHttpRequest()
xhr.open('post', '/add')
xhr.setRequestHeader('Content-type', 'application/json')
var setData = JSON.stringify({
  item:item,
  time:time,
  money:money
})
xhr.send(setData)
xhr.onload = function(){
  let originData = JSON.parse(xhr.responseText)
  let data = originData.result
  let str=''
  for(setitem in data){
    str+=`
       <ul class='setList col-4'>
          <li class='setItem'>${data[setitem].item}</li>
          <li class='setTime'>${data[setitem].time}</li>
          <li class='setMoney'>${data[setitem].money}</li>
          <li>
          <input type='button' value='刪除' class='setSend' data-change=${setitem}>
          </li>
        </ul>`
  }
  changeList.innerHTML = str
}
})

changeList.addEventListener('click',function(e){
   if (e.target.nodeName !== 'INPUT') {
     return
   }
   var id = e.target.dataset.change
   var xhr = new XMLHttpRequest()
   xhr.open('post','/addRemove')
   xhr.setRequestHeader('Content-type', 'application/json')
   let remove = JSON.stringify({id: id})
   xhr.send(remove)
   xhr.onload = function(){
    let originData = JSON.parse(xhr.responseText)
    let data = originData.result
    let str=''
  for(setitem in data){
    str+=`
       <ul class='setList col-4'>
          <li class='setItem'>${data[setitem].item}</li>
          <li class='setTime'>${data[setitem].time}</li>
          <li class='setMoney'>${data[setitem].money}</li>
          <li>
          <input type='button' value='刪除' class='setSend' data-change=${setitem}>
          </li>
        </ul>`
  }
  changeList.innerHTML = str
   }
})