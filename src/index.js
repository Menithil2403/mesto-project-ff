import './pages/index.css';
import { addCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUserInfo, updateUserInfo, updateAvatar, addNewCard, deleteCard } from './components/api.js';

// Селекторы 
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editForm = editPopup.querySelector('.popup__form[name="edit-profile"]');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form[name="avatar-form"]');
const avatarInput = avatarPopup.querySelector('.popup__input_type_url');
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
const popupCaptionImage = imagePopup.querySelector('.popup__caption');
const deletePopup = document.querySelector('.popup_type_delete');
const confirmDeleteButton = deletePopup.querySelector('.popup__button_confirm');
const saveButtonMain = newCardForm.querySelector('.popup__button');

// === Переменные для хранения удаляемой карточки ===
let cardToDelete = null;
let cardIdToDelete = null;

// Конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationConfig);

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaptionImage.textContent = cardData.name;
    openModal(imagePopup);
}

// Функция открытия попапа подтверждения удаления
function openDeletePopup(cardElement, cardId) {
    cardToDelete = cardElement;
    cardIdToDelete = cardId;
    openModal(deletePopup);
}

// Функция обработки удаления карточки
function handleDelete(cardElement, cardId) {
    openDeletePopup(cardElement, cardId);
}

// Открытие попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(editForm, validationConfig);
    openModal(editPopup);
});

profileAddButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
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

    const defaultText = saveButtonMain.textContent;
    saveButtonMain.textContent = 'Сохранение...';

    updateUserInfo(nameInput.value, descriptionInput.value)
        .then((data) => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        })
        .catch(err => console.error('Ошибка при обновлении профиля:', err))
        .finally(() => saveButtonMain.textContent = defaultText);
});

// Форма добавления новой карточки 
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const defaultText = saveButtonMain.textContent;
    saveButtonMain.textContent = 'Сохранение...';

    const newCardData = {
        name: newCardNameInput.value,
        link: newCardUrlInput.value
    };

    addNewCard(newCardData)
        .then((cardData) => {
            const newCard = addCard(cardData, userId, handleLike, handleDelete, openImagePopup);
            placeList.prepend(newCard);
            closeModal(newCardPopup);
            newCardForm.reset();
            clearValidation(newCardForm, validationConfig);
        })
        .catch((err) => console.error('Ошибка добавления карточки:', err))
        .finally(() => saveButtonMain.textContent = defaultText);
});

// Подтверждение удаления карточки 
confirmDeleteButton.addEventListener('click', () => {
    if (cardIdToDelete && cardToDelete) {
        deleteCard(cardIdToDelete)
            .then(() => {
                cardToDelete.remove();
                closeModal(deletePopup);
                cardToDelete = null;
                cardIdToDelete = null;
            })
            .catch(err => console.error('Ошибка удаления:', err));
    }
});

// === Открытие попапа изменения аватара ===
profileImage.addEventListener('click', () => {
    avatarInput.value = '';
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
});

// === Обновление аватара пользователя === 
avatarForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const saveButtonMain = avatarForm.querySelector('.popup__button');
    const defaultText = saveButtonMain.textContent;
    saveButtonMain.textContent = 'Сохранение...';

    updateAvatar(avatarInput.value)
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch((err) => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => saveButtonMain.textContent = defaultText);
});

// === Загрузка данных пользователя и карточек === 
let userId;
Promise.all([getUserInfo(), getCards()])
    .then(([user, cards]) => {
        userId = user._id;

        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;

        cards.forEach(cardData => {
            const cardElement = addCard(cardData, userId, handleLike, handleDelete, openImagePopup);
            placeList.append(cardElement);
        });
    })
    .catch(err => {
        console.error(`❌ Ошибка загрузки данных: ${err}`);
    });
