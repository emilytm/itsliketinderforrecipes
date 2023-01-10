// Remember to import the data and Dog class!
import { dogs } from './data.js'
import { Dog } from './Dog.js'

let dogArray = Array.from(dogs)
let currentDog = new Dog(dogArray.shift())
const likeButton = document.getElementById('like-button')
const dislikeButton = document.getElementById('dislike-button')

likeButton.addEventListener('click',likeDog)
dislikeButton.addEventListener('click', dislikeDog)

function likeDog(){
    handleInteraction(1)
}

function dislikeDog(){
    handleInteraction(0)
}

function handleInteraction(preference){
    let dogLiked = dogs.find(dog => dog.id === currentDog.id)
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

function flashBadge(preference) {
    let interactionBadge = document.getElementById('interaction-badge')

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

//Display the first dog
//Handle the interaction
////If like, show like button and move image off to the right
    ////Show badge
    ////Translate off screen
    ////Mark dog as hasBeenSwiped
    ////Mark dog as hasBeenLiked
////If dislike, show dislike badge and move image off to the left
    ////Show badge
    ////Translate off screen
    ////Mark dog as hasBeenSwiped
////Show the next dog
    ////If there are more dogs in the array and the dogs 
    //      haven't been swiped, show the dog



function renderDog(Dog){
    const dogDisplaySection = document.getElementById('dog-display')
    dogDisplaySection.innerHTML = Dog.getDogHtml()
}

function getNextDog(){
    if(dogArray.length > 0){
        return new Dog(dogArray.shift())
    } else {
        showEmptyState()
    }
}

function showEmptyState() {
    const dogDisplaySection = document.getElementById('dog-display')
    const emptyStateHtml = `
        <img src="../images/empty-state.jpg" class="dog-profile-picture" alt="empty state sad dog image">
        <div class="detail-overlay">
            <h2 class="dog-name detail">No more dogs, sorry!</h2>
            <p class="dog-opener detail">Try again tomorrow.</p>    
        </div>    
    `
    dogDisplaySection.innerHTML = emptyStateHtml
    likeButton.classList.add('hidden')
    dislikeButton.classList.add('hidden')
}

renderDog(currentDog)