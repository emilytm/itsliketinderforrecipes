// Create the Dog class here

class Dog {

    constructor(data){
        Object.assign(this, data)
    }

    getDogHtml() {
        const {name, avatar, age, bio, hasBeenSwiped, hasBeenLiked} = this
        return `
            <img src="../${this.avatar}" class="dog-profile-picture" alt="dog profile picture">
            <img class="interaction-badge hidden" id="interaction-badge" src="6">
            <div class="detail-overlay">
                <h2 class="dog-name detail">${name}, ${age}</h2>
                <p class="dog-opener detail">${bio}</p>    
            </div>
        `
    }

}

export { Dog }