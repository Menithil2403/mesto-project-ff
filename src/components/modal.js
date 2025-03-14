// Функция закрытия попапа по Escape
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
}

// Функция для открытия попапа
export function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

// Функция для закрытия попапа
export function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}
