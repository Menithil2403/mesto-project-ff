import { toggleLike } from './api.js';

// Переменные для хранения удаляемой карточки
let cardToDelete = null;
let cardIdToDelete = null;

// Функция открытия попапа подтверждения удаления
export function openDeletePopup(cardElement, cardId, openModal) {
    cardToDelete = cardElement;
    cardIdToDelete = cardId;
    openModal(document.querySelector('.popup_type_delete')); // Используем переданную функцию
}

// Функция получения данных о карточке для удаления
export function getDeleteTarget() {
    return { cardToDelete, cardIdToDelete };
}

// Функция добавления карточки
export function addCard(cardData, userId, handleLike, handleDelete, openImagePopup, openModal) {
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
        cardDeleteButton.addEventListener('click', () => handleDelete(cardElement, cardData._id, openModal));
    }

    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton, cardData._id, likeCounter));

    cardImage.addEventListener('click', () => openImagePopup(cardData));

    return cardElement;
}

// Функция обработки удаления карточки
export function handleDelete(cardElement, cardId, openModal) {
    openDeletePopup(cardElement, cardId, openModal);
}


// === Функция обработки лайка карточки ===
// Определяет, лайкнута ли карточка, отправляет соответствующий запрос на сервер
export function handleLike(cardLikeButton, cardId, likeCountElement) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';

    toggleLike(cardId, method)
        .then(updatedCard => {
            likeCountElement.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
            cardLikeButton.classList.toggle('card__like-button_is-active', !isLiked); // Переключаем класс
        })
        .catch(err => console.error('Ошибка постановки/снятия лайка:', err));
}