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
var type = document.querySelector('#poke-type')
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
        // setTimeout([pokemon.sprites].forEach(img => {
        //     index = 0
        //     pokeImage.src = img 
        //     index++
        // }), 1000)
        pokeImage.src = pokemon.sprites.front_default
        nameAndId.innerHTML = `${pokemon.id} ${pokemon.name}`   
        weight.innerHTML = `weigth: <strong>0,${pokemon.weight} kg.</strong>`
        height.innerHTML = `height: ${pokemon.height}0 cm`
        
    })
    fetch(`https://pokeapi.co/api/v2/type/${newSearch.value}`)
    .then(response => response.json())
    .then(tipo => {
        type.innerHTML = tipo.name
    })
    fetch(`https://pokeapi.co/api/v2/characteristic/${newSearch.value}`)
    .then(response => response.json())
    .then(char => {
        var descriptionSpanish = char.descriptions.find(descrip => descrip.language.name == "es")
        
        descriptionField.innerHTML = descriptionSpanish.description
    })
})