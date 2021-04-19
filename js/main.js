// Show content
//name and ID
var nameAndId = document.querySelector('#poke-name-id')

//imagen
var pokeImage = document.querySelector('#pokeImg')
pokeImage.src = ''

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

var intervalId = -1
var index = 0
//funciones 


searchPokemonBtn.addEventListener('click', (event) => {
    event.preventDefault();
    pokeImage.src = 'https://w7.pngwing.com/pngs/235/985/png-transparent-pokemon-red-and-blue-pokemon-snap-pokemon-diamond-and-pearl-pokemon-go-pokemon-let-s-go-eevee-pokemon-go.png'
    // var images = ['https://c0.klipartz.com/pngpicture/993/363/gratis-png-pokeball.png',
    // 'https://c0.klipartz.com/pngpicture/682/499/gratis-png-ilustracion-de-pokemon-pikachu-pokemon-platino-pokemon-blanco-y-negro-pokemon-corazon-de-oro-y-almendra-pikachu-ash-ketchum-pikachu.png']    
    //startGame(images)
    
    var url = (`https://pokeapi.co/api/v2/pokemon/${newSearch.value}`)

    function startGame(images) {
        pokeImage.src = images[index]
        pokeImage.width = '25px'
        pokeImage.src = images[1]?  (changeImage()) : index++  
        index++
    }
    

    fetch(url)
    .then(response => response.json())
    .then( pokemon => {
        

        //change values

    var changeImage = function() {
             
        let index = 0
        let imagesURL = Object.values(pokemon.sprites)
        let images = [imagesURL[6],imagesURL[2]]
        
        pokeImage.src = images[0]
        
        intervalId = setInterval(() => {
           pokeImage.src = images[index]
           index == 1 ? index = 0 : index++  
        },1000)
         
    }
    
        
        //pokeImage.src = ''
        clearInterval(intervalId)
        
        setTimeout(changeImage, 3000)
        
       
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