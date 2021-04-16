// Show content
//name and ID
var nameAndId = document.querySelector('#poke-name-id')

//imagen
var pokeImage = document.querySelector('#PokeImg')

//moves, weight and habitat
var moves = document.querySelector('#poke-moves')
var weight = document.querySelector('#poke-weight')
var height = document.querySelector('#poke-height')

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
        var movesUl = document.querySelector('#movesUl')
        //change values
        pokeImage.src = pokemon.sprites.front_default
        nameAndId.innerHTML = `${pokemon.name} - id:${pokemon.id}`   
        weight.innerHTML = `weigth: <strong>0,${pokemon.weight} kg.</strong>`
        height.innerHTML = `height: ${pokemon.height}`

        
        })
})