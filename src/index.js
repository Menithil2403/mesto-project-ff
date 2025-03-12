import './pages/index.css';
import { addCard, handleLike, handleDelete } from './components/card.js';
import { openModal, closeModal, getDeleteTarget } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUserInfo, updateUserInfo, updateAvatar, addNewCard, deleteCard} from './components/api.js';

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
const popupCaption = imagePopup.querySelector('.popup__caption');

const deletePopup = document.querySelector('.popup_type_delete'); 
const confirmDeleteButton = deletePopup.querySelector('.popup__button_confirm');


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


// Функция для открытия попапа с изображением
function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
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
    
    const saveButton = editForm.querySelector('.popup__button');
    const defaultText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';

    updateUserInfo(nameInput.value, descriptionInput.value)
        .then((data) => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        })
        .catch(err => console.error('Ошибка при обновлении профиля:', err))
        .finally(() => saveButton.textContent = defaultText);
});


// Форма добавления новой карточки 
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const saveButton = newCardForm.querySelector('.popup__button');
    const defaultText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';

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
        .finally(() => saveButton.textContent = defaultText);
});



// Подтверждение удаления карточки 
confirmDeleteButton.addEventListener('click', () => {
    const { cardToDelete, cardIdToDelete } = getDeleteTarget();
    
    if (cardIdToDelete && cardToDelete) {
        deleteCard(cardIdToDelete)
            .then(() => {
                cardToDelete.remove(); 
                closeModal(deletePopup); 
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

    const saveButton = avatarForm.querySelector('.popup__button');
    const defaultText = saveButton.textContent;
    saveButton.textContent = 'Сохранение...';

    updateAvatar(avatarInput.value)
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch((err) => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => saveButton.textContent = defaultText);
});



// === Загрузка карточек (тестовый вызов API) ===
getCards().then(cards => {
    console.log('Карточки:', cards);
}).catch(err => console.log(`Ошибка загрузки карточек: ${err}`));
// === Загрузка информации о пользователе (тестовый вызов API) ===
getUserInfo().then(user => {
    console.log('Информация о пользователе:', user);
}).catch(err => console.log(`Ошибка загрузки пользователя: ${err}`));


// === Загрузка данных пользователя и карточек ===
let userId; // === Глобальная переменная для ID пользователя ===
Promise.all([getUserInfo(), getCards()])
.then(([user, cards]) => {
    // Сохраняем userId глобально, чтобы он был доступен в других функциях
    userId = user._id; 

    // Отображаем профиль пользователя
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    // Отображаем карточки
    cards.forEach(cardData => {
        const cardElement = addCard(cardData, userId, handleLike, handleDelete, openImagePopup);
        placeList.append(cardElement);
    });
})
.catch(err => {
    console.error(`❌ Ошибка загрузки данных: ${err}`);
});


