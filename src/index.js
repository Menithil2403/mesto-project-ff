// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import {initialCards} from '../src/cards.js';

const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

function addCard(imgLink, cardTitle) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    

    cardImage.setAttribute('src', imgLink);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardImage.setAttribute('alt', cardTitle);

    // Добавляем обработчик для кнопки лайка//
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    // Добавляем обработчик для кнопки удаления
    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    // Добавляем обработчик клика на картинку
    cardImage.addEventListener('click', () => {
        const popupImage = document.querySelector('.popup_type_image .popup__image');
        const popupCaption = document.querySelector('.popup_type_image .popup__caption');
        
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        popupCaption.textContent = cardImage.alt;
        togglePopup(document.querySelector('.popup_type_image'), true);
    });

    return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// Функция рендеринга карточки
function renderCard(Card) {
    placeList.prepend(Card);
}

initialCards.forEach((i) => {
    renderCard(addCard(i.link, i.name));
})

// Универсальная функция переключения попапа
function togglePopup(popupElement, isOpen) {
    if (isOpen) {
        popupElement.classList.add('popup_is-animated');
        setTimeout(() => {
            popupElement.classList.add('popup_is-opened');
        }, 0);
    } else {
        popupElement.classList.remove('popup_is-opened');
        setTimeout(() => {
            popupElement.classList.remove('popup_is-animated');
        }, 600);
    }
}

// Селекторы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');


// Открытие попапов
editButton.addEventListener('click', () => togglePopup(editPopup, true));
addButton.addEventListener('click', () => togglePopup(newCardPopup, true));

// Закрытие попапов (по кнопке и оверлею)
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close')) {
        const popup = event.target.closest('.popup');
        togglePopup(popup, false);
    } else if (event.target.classList.contains('popup')) {
        togglePopup(event.target, false);
    }
});

// Закрытие попапов по клавише Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.popup_is-opened').forEach(popup => togglePopup(popup, false));
    }
});

// Открытие попапа редактирования профиля
function openEditPopup() {
    const nameInput = editPopup.querySelector('.popup__input_type_name');
    const descriptionInput = editPopup.querySelector('.popup__input_type_description');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    togglePopup(editPopup, true);
}
editButton.addEventListener('click', openEditPopup);

// Сохранение профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = editForm.querySelector('.popup__input_type_name');
    const descriptionInput = editForm.querySelector('.popup__input_type_description');
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    togglePopup(editPopup, false);
});

// Получаем элементы формы и её поля для добавления карточки
const newCardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardForm = newCardPopup.querySelector('.popup__form[name="new-place"]');

// Добавления новой карточки
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imgLink = newCardUrlInput.value;
    const cardTitle = newCardNameInput.value;

    const newCard = addCard(imgLink, cardTitle);
    
    placeList.prepend(newCard);
    togglePopup(newCardPopup, false);
    newCardForm.reset();
});