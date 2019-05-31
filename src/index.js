const list = document.querySelector("#list-group")
const div = document.querySelector("#beer-detail")


fetch("http://localhost:3000/beers")
.then((res) => res.json())
.then(data => {
    console.log(data)
data.forEach(beer => {

let li =  document.createElement("li")
li.class = "list-group-item"
li.innerText = beer.name

list.append(li)

li.addEventListener("click", (e) => {
    e.preventDefault()
div.innerHTML = ''

let h1tag =  document.createElement("h1") 
 h1tag.innerText = beer.name

let img =  document.createElement("img") 
img.src = beer.image_url

let h3tag =  document.createElement("h3") 
h3tag.innerText = beer.tagline

let text1 =  document.createElement("textarea") 
text1.innerText = beer.description

let savebtn =  document.createElement("button") 
savebtn.id = "edit-beer"
savebtn.class = "btn btn-info"
savebtn.innerText = "Save"
div.append(h1tag, img , h3tag, text1, savebtn)

savebtn.addEventListener("click", (e) => {
    e.preventDefault()
    
newdescription = e.target.previousElementSibling.value

fetch(`http://localhost:3000/beers/${beer.id}`,{

   method: 'PATCH',
   headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
   },
   body: JSON.stringify({
"description": newdescription
  
})

 
}) //fetch id
.then(res => res.json())
.then(beer => {
    console.log(beer)
text1.innerText = beer.description
// debugger
//     div.append(text2)
})

}) //save button



}) //beer data

})  //li event listener





}) //fetch
