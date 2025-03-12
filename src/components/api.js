// === Конфигурация API ===
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: '7c4a5e19-3e7e-46c2-805c-562cedf541ca',
        'Content-Type': 'application/json'
    }
};


// === Получение карточек с сервера ===
// Функция делает GET-запрос для получения списка карточек
export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(res => res.json());
};


// === Получение информации о пользователе ===
// Функция делает GET-запрос для получения данных профиля пользователя
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(res => res.json());
};


// === Обновление информации о пользователе ===
// Функция делает PATCH-запрос для обновления имени и описания профиля
export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}


// === Обновление аватара пользователя ===
// Функция делает PATCH-запрос для изменения аватара
export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}


// === Добавление новой карточки ===
// Функция делает POST-запрос для создания новой карточки
export function addNewCard(cardData) {
    const requestBody = JSON.stringify({
        name: cardData.name, 
        link: cardData.link 
    });

    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: requestBody
    }).then(res => {
        if (!res.ok) {
            return res.json().then(err => Promise.reject(`Ошибка ${res.status}: ${err.message || 'Нет данных'}`));
        }
        return res.json();
    });
}


// === Удаление карточки ===
// Функция делает DELETE-запрос для удаления карточки по её ID
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка удаления: ${res.status}`);
        }
        return res.json();
    });
}

// === Установка и снятие лайка ===
// Универсальная функция, которая отправляет PUT-запрос для установки лайка
// или DELETE-запрос для его удаления
export function toggleLike(cardId, method) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    });
}