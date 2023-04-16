import { dogs } from './data.js'
import { Dog } from './Dog.js'

let dogArray = Array.from(dogs)
let currentDog = new Dog(dogArray.shift())

document.addEventListener('click',function(e){

    if(e.target.dataset.btn === 'like'){
        handleInteraction(1)
    } else if (e.target.dataset.btn === 'dislike'){
        handleInteraction(0)
    }
})

//Update the dog's data depending on whether they were liked or disliked, and call fns to show badge and get next dog

function handleInteraction(preference){

    let dogLiked = dogs.find(dog => dog.id === currentDog.id)

    document.getElementById('like-button').disabled = true
    document.getElementById('dislike-button').disabled = true

    if(preference){
        dogLiked.hasBeenLiked = true
    }

    dogLiked.hasBeenSwiped = true

    flashBadge(preference)

    setTimeout( () => {
        if(dogArray.length > 0){
            currentDog = getNextDog()
            renderDog(currentDog)
        } else {
            showEmptyState()
        }
    },"1000")
}

//Show the appropriate badge based on the user's preference, then hide after 1 sec

function flashBadge(preference) {

    const interactionBadge = document.getElementById('interaction-badge')

    if(preference) {
        interactionBadge.setAttribute('src','../images/badge-like.png')
    } else {
        interactionBadge.setAttribute('src','../images/badge-nope.png')
    }

    interactionBadge.classList.remove('hidden')
    
    setTimeout( () => {
        interactionBadge.classList.add('hidden')
    },"1000")
}

//Display dog's profile picture and details

function renderDog(Dog){

    const dogDisplaySection = document.getElementById('dog-display')

    dogDisplaySection.innerHTML = Dog.getDogHtml()
    dogDisplaySection.style.backgroundImage = `url(${'./'+Dog.avatar})`

    document.getElementById('like-button').disabled = false
    document.getElementById('dislike-button').disabled = false
}

//Get the next dog if there is one. If there isn't, call the empty state fn to update interface

function getNextDog(){

    if(dogArray.length > 0){
        return new Dog(dogArray.shift())
    } else {
        showEmptyState()
    }
}

//Show the empty state dog and msg and hide the interaction buttons

function showEmptyState() {

    const dogDisplaySection = document.getElementById('dog-display')
    const emptyStateHtml = `
        <div class="detail-overlay">
            <h2 class="dog-name detail">No more dogs, sorry!</h2>
            <p class="dog-opener detail">Try again tomorrow.</p>    
        </div>    
    `

    dogDisplaySection.style.backgroundImage = `url('../images/empty-state.jpg')`
    dogDisplaySection.innerHTML = emptyStateHtml

    document.getElementById('like-button').classList.add('hidden')
    document.getElementById('dislike-button').classList.add('hidden')
}

renderDog(currentDog)