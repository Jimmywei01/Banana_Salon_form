let text2Item = document.getElementById('text2Item')
let list = document.querySelector('.list')
let resuleBotton = document.querySelector('.resuleBotton')

// 更新(重新撈取資料)
resuleBotton.addEventListener('click',function(){
  var xhr = new XMLHttpRequest()
  xhr.open('post', '/messageBoard/result')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
  xhr.onload = function(){
    let originData = JSON.parse(xhr.responseText)
    let data = originData.result
    let str = ''
    for(item in data){
    str += 
      `<ul class='text2_Item col-6'>
      <li class = 'text2_Date'>${data[item].date}</li>
      <li class = 'text2_Time'>${data[item].dateTime}</li>
      <li class = 'text2_Name'>${data[item].username}</li>
      <li class = 'text2_Phone'>${data[item].phone}</li>
      <li class = 'text2_Haire'>${data[item].item}</li>
      <li><input type='button' value='刪除' class='reserveSend'  data-id=${item}></li>
    </ul>`
    }
    list.innerHTML = str
  }
})



// 要用 父元素觸發子元素 不然會 laod 太重
  text2Item.addEventListener('click', function (e) {
    if (e.target.nodeName !== 'INPUT') {
      return
    }
    // 選到 ejs 上的 id
    let id = e.target.dataset.id
    var xhr = new XMLHttpRequest()

    // 在同個 messageBoard 頁面刪資料
    xhr.open('post', '/messageBoard/remove')
    xhr.setRequestHeader('Content-type', 'application/json')
    let remove = JSON.stringify({id: id})
    xhr.send(remove)
    xhr.onload = function () {
      let originData = JSON.parse(xhr.responseText)
      let data = originData.result
      let str = ''
      for (item in data) {
        str +=
          `<ul class='text2_Item col-6'>
            <li class = 'text2_Date'>${data[item].date}</li>
            <li class = 'text2_Time'>${data[item].dateTime}</li>
            <li class = 'text2_Name'>${data[item].username}</li>
            <li class = 'text2_Phone'>${data[item].phone}</li>
            <li class = 'text2_Haire'>${data[item].item}</li>
            <li><input type='button' value='刪除' class='reserveSend'  data-id=${item}></li>
          </ul>`
      }
      list.innerHTML = str
    }
  })






