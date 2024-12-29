// Функция для открытия попапа
export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
}

// Функция для закрытия попапа
export function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
}
