document.addEventListener("DOMContentLoaded", function(){

    const ul = document.querySelector('.list-group')
    const div = document.querySelector('#beer-detail')
    const baseURL = 'http://localhost:3000/beers'

    fetch(baseURL)
    .then(function(res){
        return res.json()
    })
    .then(function(beers){
        beers.forEach(function(beer){
            renderBeer(beer)
        })
    })

    function renderBeer(beer){

        let li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        li.innerText = beer.name

        li.addEventListener('click', (e)=> {
            if (e.target.value == 0){
                
                let h1 = document.createElement('h1')
                h1.innerText = beer.name

                let img = document.createElement('img')
                img.setAttribute('src', beer.image_url)

                let h3 = document.createElement('h3')
                h3.innerText = beer.tagline

                let textArea = document.createElement('textarea')
                textArea.innerText = beer.description

                let button = document.createElement('button')
                button.setAttribute('id', 'edit-beer')
                button.setAttribute('class', 'btn btn-info')
                button.innerText = "Save"

                button.addEventListener('click', (e)=> {
                    e.preventDefault()
                    let newDesc = e.target.previousSibling.value
                    
                    // debugger
                    fetch(baseURL+`/${beer.id}`,{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'description': newDesc
                        })
                    })
                    .then(function(res){
                        return res.json()
                    })
                    .then(function(data){
                        let newText = document.getElementById('edit-beer').previousElementSibling.value
                        newText = data.description
                        

                    })
                    

                })

                div.append(h1, img, h3, textArea, button)
                
            }

        })
        
        ul.append(li)




        
        
        


    }
    

























})