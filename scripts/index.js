// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

function addSong(imgLink, cardTitle, altLink = 'test') {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    placeList.append(cardElement);

    cardElement.querySelector('.card__image').setAttribute('src', imgLink);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').setAttribute('alt', altLink); 
    
    placeList.onclick = function(e) {
        const btn = e.target.closest('.card__delete-button');
        if (!btn) {
          return;
        }
        
        btn.parentElement.remove();
    }
}

let arrayLength = initialCards.length;
for (let i = 0; i < arrayLength; i++) {
    addSong(initialCards[i].link, initialCards[i].name)
}

