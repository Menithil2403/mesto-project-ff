
// Функция для создания карточки
export function addCard(cardData, handleLike, handleDelete, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');

    // Используем данные из объекта
    cardImage.setAttribute('src', cardData.imgLink);
    cardImage.setAttribute('alt', cardData.cardTitle);
    cardTitleElement.textContent = cardData.cardTitle;

    // Установка обработчиков
    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));
    cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));
    cardImage.addEventListener('click', () => openImagePopup(cardData));

    return cardElement;
}

// Обработчик лайка
export function handleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// Обработчик удаления карточки
export function handleDelete(cardElement) {
    if (cardElement && cardElement.remove) {
        cardElement.remove();
    } else {
        console.error('Удаляемый элемент не найден или не поддерживает remove.');
    }
}
