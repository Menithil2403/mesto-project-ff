import './pages/index.css';
import { initialCards } from './cards.js';
import { addCard, handleLike, handleDelete } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Селекторы 
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');  
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = editPopup.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = newCardPopup.querySelector('.popup__form[name="new-place"]');
const newCardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функция для открытия попапа с изображением
function openImagePopup(cardData) {
    popupImage.src = cardData.imgLink;
    popupImage.alt = cardData.cardTitle;
    popupCaption.textContent = cardData.cardTitle;
    openModal(imagePopup);
}

// Рендер карточек
initialCards.forEach((card) => {
    const cardData = {
        imgLink: card.link,
        cardTitle: card.name
    };
    const cardElement = addCard(cardData, handleLike, handleDelete, openImagePopup);
    placeList.prepend(cardElement);
});

// Открытие попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editPopup);
});

profileAddButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

// Закрытие попапов (устанавливаем слушатели на кнопки и оверлеи)
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

overlays.forEach(overlay => {
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeModal(overlay);
        }
    });
});

// Редактирование профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editPopup);
});

// Добавление новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCardData = {
        imgLink: newCardUrlInput.value,
        cardTitle: newCardNameInput.value
    };
    const newCard = addCard(newCardData, handleLike, handleDelete, openImagePopup);
    placeList.prepend(newCard);
    closeModal(newCardPopup);
    newCardForm.reset();
});
