let select_Service = document.querySelector('.select_Service')
let clickItem = document.getElementById('item')
let itemData = document.querySelector('.itemData')
let addClass = document.getElementById('addClass')



let xhrOpen = function(){
var xhr = new XMLHttpRequest()
xhr.open('post', '/contact/setlists')
console.log(xhr)
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send()
xhr.onload = function(){
let originData = JSON.parse(xhr.responseText)
let data = originData.result
let str=''
for(item in data){
  str += `
  <ul class='dataItem' data-item =${data[item].item}>
    <li class='backColor' data-item =${data[item].item}>${data[item].item} 
      <label for=${item}>
        <input type="radio" id=${item} name='item' class='radio'>
      </label>
    </li>
    <li class='money'  data-item =${data[item].item}>${data[item].time} ${data[item].money}</li>
  </ul>
  `
    }
itemData.innerHTML = str
  }
}
xhrOpen()



addClass.addEventListener('click', function (e) {
  if(e.target.nodeName !== 'LI') {
      return
    }
    select_Service.innerHTML = e.target.dataset.item
    clickItem.value = e.target.dataset.item
})

