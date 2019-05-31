document.addEventListener("DOMContentLoaded",()=>{
let ul =  document.querySelector('#list-group')
const  beerURL = 'http://localhost:3000/beers'
const div = document.querySelector('#beer-detail')
let thisBeer = null
let beerArr = []

function fetchBeer(){
  fetch(beerURL)
  .then(res => res.json())
  .then(beers => {
    // debugger
    beers.forEach((beer)=>{
      //render beer function or something
      renderBeer(beer)
      beerArr.push(beer)
    })
  })
}
function renderBeer(beer){
  let li = document.createElement('li')
  li.innerText = beer.name
  ul.append(li)

  li.addEventListener('click',(e)=>{
    div.innerHTML = ""
    e.preventDefault()
    console.log("test display")
    thisBeer = beerArr.find((beer)=>{
      return beer.name == e.target.innerText
    })
    displayInfo(thisBeer)
  })
}

function displayInfo(beer){

  let h1 = document.createElement('h1')
  let image = document.createElement('img')
  let h3 = document.createElement('h3')
  let textarea = document.createElement('textarea')
  let btn = document.createElement('button')

  h1.innerText = beer.name
  image.src = beer.image_url
  h3.innerText = beer.tagline
  textarea.value = beer.description
  btn.innerText = "Save"

  div.append(h1,image,h3,textarea,btn)
// debugger
  btn.addEventListener('click',(e)=>{
    e.preventDefault()
    // debugger
    fetch(`${beerURL}/${beer.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type': 'application/json',
      'Accept': 'application/json'},
        body: JSON.stringify({
          description: textarea.value
        })


    })//fetch
    .then(res => res.json())
    .then(data =>
    {console.log(data)})//fetch

  //
  //   .then(()=> {
  //     textarea.value = beer.description
  // })
      function getDesc(){
        textarea.value = beer.description
      }



  })//listener

}


fetchBeer()
})
