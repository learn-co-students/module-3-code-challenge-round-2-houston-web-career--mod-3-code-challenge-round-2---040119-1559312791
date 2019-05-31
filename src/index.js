document.addEventListener('DOMContentLoaded', () => 
{
   
    const beerUrl = "http://localhost:3000/beers"
    let beerList = document.querySelector(".list-group")
    let beerDetail = document.querySelector("#beer-detail")
    let beerId;

    function fetchBeers()
    {
        fetch(beerUrl)
        .then(res => res.json())
        .then(data => 
            {
                data.forEach(beer => renderBeer(beer))
            })
    }

    function renderBeer(beer)
    {
        let li = document.createElement('li')
         li.class = "list-group-item"
         li.innerText = ` -->${beer.name}`
        li.addEventListener('click', (e) => 
        {
            beerDetail.innerHTML = ''
            beerId = beer.id
            e.preventDefault()
            fetch(`${beerUrl}/${beerId}`)
            let h1 = document.createElement('h1')
             h1.innerText = beer.name
            let img = document.createElement('img')
             img.src = beer.image_url 
            let h3 = document.createElement('h3')
             h3.innerText = beer.tagline
            let textarea = document.createElement('textarea')
             textarea.innerText = beer.description
            let btn = document.createElement('button')
             btn.class = "btn btn-info"
             btn.id = "edit-beer"
             btn.innerText = "Save"
            btn.addEventListener('click', (e) => 
            {
                beerId = beer.id
                e.preventDefault()
                fetch(`${beerUrl}/${beerId}`, 
                {
                    method: 'PATCH',
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            description: e.target.previousElementSibling.value
                        })
                })
                .then(res => res.json())
                .then(data => 
                    {
                        beer.description = data.description
                    })
            })
            
             beerDetail.append(h1,img,h3,textarea,btn)
        })
        
        
        
        
        
        
         beerList.append(li)

    }










 fetchBeers()
})