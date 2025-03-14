import { toggleLike } from './api.js';

// Функция добавления карточки
export function addCard(cardData, userId, handleLike, handleDelete, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');
    const likeCounter = cardElement.querySelector('.card__like-count');

    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    cardTitleElement.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    if (cardData.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id !== userId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', () => handleDelete(cardElement, cardData._id));
    }

    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton, cardData._id, likeCounter));

    cardImage.addEventListener('click', () => openImagePopup(cardData));

    return cardElement;
}

// Функция обработки лайка карточки
export function handleLike(cardLikeButton, cardId, likeCountElement) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';

    toggleLike(cardId, method)
        .then(updatedCard => {
            likeCountElement.textContent = updatedCard.likes.length; // Обновляем счётчик лайков
            cardLikeButton.classList.toggle('card__like-button_is-active', !isLiked); // Переключаем класс
        })
        .catch(err => console.error('Ошибка постановки/снятия лайка:', err));
}
