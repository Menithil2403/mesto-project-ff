export function addCard(imgLink, cardTitle, togglePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.setAttribute('src', imgLink);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardImage.setAttribute('alt', cardTitle);

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
        const popupImage = document.querySelector('.popup_type_image .popup__image');
        const popupCaption = document.querySelector('.popup_type_image .popup__caption');
        const imagePopup = document.querySelector('.popup_type_image');

        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupCaption.textContent = cardImage.alt;
        togglePopup(imagePopup, true);
    });

    return cardElement;
}