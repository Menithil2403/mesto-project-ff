// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import './pages/index.css';
import { initialCards } from './cards.js';
import { addCard } from './components/card.js';
import { togglePopup } from './components/modal.js';

const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// Рендер карточек
initialCards.forEach((card) => {
    const cardElement = addCard(card.link, card.name, togglePopup);
    placeList.prepend(cardElement);
});

// Селекторы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = newCardPopup.querySelector('.popup__form[name="new-place"]');
const newCardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardPopup.querySelector('.popup__input_type_url');

// Открытие попапов
document.querySelector('.profile__edit-button').addEventListener('click', () => togglePopup(editPopup, true));
document.querySelector('.profile__add-button').addEventListener('click', () => togglePopup(newCardPopup, true));

// Закрытие попапов
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        togglePopup(event.target.closest('.popup'), false);
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.popup_is-opened').forEach(popup => togglePopup(popup, false));
    }
});

// Редактирование профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = editForm.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = editForm.querySelector('.popup__input_type_description').value;
    togglePopup(editPopup, false);
});

// Добавление новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCard = addCard(newCardUrlInput.value, newCardNameInput.value, togglePopup);
    placeList.prepend(newCard);
    togglePopup(newCardPopup, false);
    newCardForm.reset();
});
