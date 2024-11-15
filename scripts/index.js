// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

function addCard(imgLink, cardTitle, altText = 'test') {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').setAttribute('src', imgLink);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').setAttribute('alt', altText); 

    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function renderCard(Card) {
    placeList.prepend(Card);
}

initialCards.forEach((i) => {
    renderCard(addCard(i.link, i.name));
})
