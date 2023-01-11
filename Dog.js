// Create the Dog class here

class Dog {

    constructor(data){
        Object.assign(this, data)
    }

    getDogHtml() {
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked} = this

        return `
            <img class="interaction-badge hidden" id="interaction-badge">
            <div class="detail-overlay">
                <h2 class="dog-name detail">${name}, ${age}</h2>
                <p class="dog-opener detail">${bio}</p>    
            </div>
        `
    }

}

export { Dog }

