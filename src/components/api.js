// === Конфигурация API ===
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: '7c4a5e19-3e7e-46c2-805c-562cedf541ca',
        'Content-Type': 'application/json'
    }
};

// === Функция для обработки ответа сервера ===
function getResponseData(res) {
    if (!res.ok) {
        return res.json().then(err => Promise.reject(`Ошибка ${res.status}: ${err.message || 'Нет данных'}`));
    }
    return res.json();
}

// === Получение карточек с сервера ===
export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(getResponseData);
}

// === Получение информации о пользователе ===
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(getResponseData);
}

// === Обновление информации о пользователе ===
export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    }).then(getResponseData);
}

// === Обновление аватара пользователя ===
export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    }).then(getResponseData);
}

// === Добавление новой карточки ===
export function addNewCard(cardData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name: cardData.name, link: cardData.link })
    }).then(getResponseData);
}

// === Удаление карточки ===
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(getResponseData);
}

// === Установка и снятие лайка ===
export function toggleLike(cardId, method) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    }).then(getResponseData);
}
