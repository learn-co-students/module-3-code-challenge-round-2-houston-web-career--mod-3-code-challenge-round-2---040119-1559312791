document.addEventListener('DOMContentLoaded', () => {

    let baseUrl = "http://localhost:3000/beers"
    let listGroup = document.querySelector('.list-group')
    let beerDetail = document.querySelector('#beer-detail')

    function getBeers(){
        fetch(baseUrl)
        .then(res=>res.json())
        .then(data=>{
            data.forEach(beer=>(renderBeer(beer)))
        })
    }

    function renderBeer(beer){
        let li = document.createElement('li')
        li.setAttribute('class','list-group-item')
        li.innerText = beer.name
        li.addEventListener("click",(e)=>{
            e.preventDefault()
            getBeerInfo(beer)
        })
        
        listGroup.append(li)
    }

    function getBeerInfo(beer){
        fetch(`${baseUrl}/${beer.id}`)
        .then(res=>res.json())
        .then()
            beerDetail.innerHTML = ""
            
            let h1 = document.createElement('h1')
            h1.innerText = beer.name
            let img = document.createElement('img')
            img.src = beer.image_url
            let h3 = document.createElement('h3')
            h3.innerText = beer.tagline
            let textarea = document.createElement('textarea')
            textarea.setAttribute("id","text")
            textarea.innerText = beer.description
            let button = document.createElement('button')
            button.setAttribute("id","edit-beer")
            button.setAttribute("class","btn btn-info")
            button.innerText = "save"
            button.addEventListener("click",(e)=>{
                e.preventDefault()
                patchBeer(beer)
            })
            beerDetail.append(h1,img,h3,textarea,button)
      
    }
    
    function patchBeer(beer){
        fetch(`${baseUrl}/${beer.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'description' : document.querySelector('#text').value
            })
        })
        .then(res=>res.json())
        .then(data=>{
            beer.description = data.description
        })
        
        
    }

    getBeers()
})

