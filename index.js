
function getCharacters(link) {
    const characters = fetch(link)
    .then(res => res.json())
    .then(function (objectsArray) {  // success callback
              return objectsArray
      }); 
    return characters;
}

function displayElements(objectArray, parentTag) {
    const htmlArray = objectArray.map(obj => {
        return `<div class="col"><div class="card h-100">
        <img src="${obj.photoUrl}" class="card-img-top" alt="Image unable to load..." onerror="this.src='images/missing_image.png'">
        <div class="card-body card-body">
            <h3 class="card-title"><strong>${obj.name}</strong></h3>
            <ul class="list-group card-list">
                <li class="list-group-item">
                    <div class="card-section-title">
                        <h5>Affiliation:</h5>
                    </div>
                    <div class="card-section-body">
                        <em>${obj.affiliation}</em>
                    </div>
                </li>
                <li class="list-group-item list-group-item-success">
                    <div class="card-section-title">
                        <h5>Allies:</h5>
                    </div>
                    <div class="card-section-body">
                        <em>${obj.allies}</em>
                    </div>
                </li>
                <li class="list-group-item list-group-item-danger">
                    <div class="card-section-title">
                        <h5>Enemies:</h5>
                    </div>
                    <div class="card-section-body">
                        <em>${obj.enemies}</em>
                    </div>
                </li>
              </ul>
        </div>
    </div></div>` 
    })
    document.querySelector(parentTag).innerHTML = htmlArray.join('');
}

const funcLink = 'https://last-airbender-api.herokuapp.com/api/v1/characters';
const nationCards = document.querySelector('#nation-grid');
const promptText = document.querySelector('#prompt-text');
const pagePrompt = document.querySelector('.page-prompt');

document.addEventListener('click', event => {
    console.log(event.target)

    if (event.target.classList.contains('nation-image') || event.target.classList.contains('btn')) {
        let newLink = '';
        if (event.target.classList.contains('water')) {
            newLink = funcLink + '?affiliation=Water+Tribe';
            promptText.innerHTML = "Water Tribe";
        }
        else if (event.target.classList.contains('earth')) {
            newLink = funcLink + '?affiliation=Earth+Kingdom';
            promptText.innerHTML = "Earth Kingdom";
        }
        else if (event.target.classList.contains('fire')) {
            newLink = funcLink + '?affiliation=Fire+Nation';
            promptText.innerHTML = "Fire Nation";
        }
        else if (event.target.classList.contains('air')) {
            newLink = funcLink + '?affiliation=Air+Nomads';
            promptText.innerHTML = "Air Nomads";
        }
        else {
            newLink = funcLink + '/random?count=12';
        }
        console.log(newLink);
        getCharacters(newLink).then(characterArray => {  
            displayElements(characterArray, '#card-parent');
        });
        
        nationCards.style.display = "none";

        if(!document.querySelector('#change-nation-div')) {
            const changeButtonsDiv = document.createElement('div');
            changeButtonsDiv.setAttribute('id', 'change-nation-div')
            changeButtonsDiv.innerHTML = '<button type="button" class="btn btn-primary water">Water</button><button type="button" class="btn btn-warning earth">Earth</button><button type="button" class="btn btn-danger fire">Fire</button><button type="button" class="btn btn-secondary air">Air</button>'
            pagePrompt.after(changeButtonsDiv);
        }
    }
})

if (window.location.href.includes('index')) {
    newLink = 'https://last-airbender-api.herokuapp.com/api/v1/characters/random?count=12';
    getCharacters(newLink).then(characterArray => {  
        displayElements(characterArray, '#card-parent');
    });
}
else if (window.location.href.includes('avatars')) {
    newLink = 'https://last-airbender-api.herokuapp.com/api/v1/characters/avatar';
    getCharacters(newLink).then(characterArray => {  
        displayElements(characterArray, '#card-parent');
    });
}




