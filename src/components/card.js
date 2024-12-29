
export function addCard(cardData, openImagePopup, openModal) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    // Используем данные из объекта
    cardImage.setAttribute('src', cardData.imgLink);
    cardElement.querySelector('.card__title').textContent = cardData.cardTitle;
    cardImage.setAttribute('alt', cardData.cardTitle);

    // Лайк
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    // Удаление
    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    // Открытие изображения
    cardImage.addEventListener('click', () => {
        openImagePopup(cardImage);
    });

    return cardElement;
}
