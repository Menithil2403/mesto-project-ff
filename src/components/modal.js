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

let cardToDelete = null; // Хранит элемент карточки, которую нужно удалить
let cardIdToDelete = null; // Хранит ID карточки, которая будет удалена


// === Функция открытия попапа подтверждения удаления ===
// Сохраняет информацию о карточке и её ID, затем открывает попап
export function openDeletePopup(cardElement, cardId) {
    cardToDelete = cardElement;
    cardIdToDelete = cardId;
    openModal(document.querySelector('.popup_type_delete'));
}


// === Функция получения данных о карточке для удаления ===
// Возвращает объект с сохранённой карточкой и её ID
export function getDeleteTarget() {
    return { cardToDelete, cardIdToDelete };
}