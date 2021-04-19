// Show content
//name and ID
var nameAndId = document.querySelector('#poke-name-id')

//imagen
var pokeImage = document.querySelector('#pokeImg')
var evolucionImg = document.querySelector('#poke-evolucion')


//moves, weight and habitat
var moves = document.querySelector('#poke-moves')
var weight = document.querySelector('#poke-weight')
var height = document.querySelector('#poke-height')
var typeField = document.querySelector('#poke-type')
var descriptionField = document.querySelector('#poke-description')

// Poke-Finder
//input
var newSearch = document.querySelector('#new-search')

//botones
var searchPokemonBtn = document.querySelector('#searchBtn')

searchPokemonBtn.addEventListener('click', (event) => {
    event.preventDefault();
    

    var url = (`https://pokeapi.co/api/v2/pokemon/${newSearch.value}`)
    

    fetch(url)
    .then(response => response.json())
    .then( pokemon => {
        
        //change values
        var changeImage = function() {
             
            let index = 0
            let imagesURL = Object.values(pokemon.sprites)
            let images = [imagesURL[6],imagesURL[2]]

            pokeImage.src = images[0]
            
            let id = setInterval(() => {
               pokeImage.src = images[index]
               index == 1 ? index = 0 : index++   
            },1000)
             
        }
        pokeImage.src = ''
        changeImage()
       
        nameAndId.innerHTML = `${pokemon.id} ${pokemon.name}`   
        weight.innerHTML = `weigth: <strong>0,${pokemon.weight} kg.</strong>`
        height.innerHTML = `height: ${pokemon.height}0 cm`
        pokemon.types.forEach( type => {
            typeField.innerHTML = type.type.name
        } )
        
        //const imagesURL = [Object.values(pokemon.sprites)]
        const abilitiesURL = pokemon.abilities.map(ability => fetch( ability.ability.url))
        return Promise.all(abilitiesURL)
        
    })
    .then( (responses) => {
        
        var promesas = responses.map(response => response.json())
        // var images = responses[1].map(response => response.json())
        
        return Promise.all(promesas)
    })
    .then( jsons => {
       
        jsons.forEach(( ability) => {
            descriptionField.innerText = ability.flavor_text_entries[0].flavor_text
        })

    })
    
  
})