// Функция включает валидацию для всех форм, соответствующих селектору
export function enableValidation(config) {
    // Находим все формы по селектору
    const forms = document.querySelectorAll(config.formSelector);
    
    // Для каждой формы устанавливаем обработчики событий
    forms.forEach(form => {
        setEventListeners(form, config);
    });
}

// Функция добавляет обработчики событий для полей формы
function setEventListeners(form, config) {
    // Находим все поля ввода в форме
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    // Находим кнопку отправки формы
    const submitButton = form.querySelector(config.submitButtonSelector);

    // Добавляем обработчик на каждое поле ввода
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Проверяем валидность поля
            checkInputValidity(form, input, config);
            // Управляем состоянием кнопки отправки
            toggleButtonState(inputs, submitButton, config);
        });
    });

    // При сбросе формы очищаем ошибки валидации
    form.addEventListener('reset', () => {
        setTimeout(() => {
            clearValidation(form, config);
        }, 0); // setTimeout нужен, чтобы изменения произошли после сброса формы
    });

    // Проверяем состояние кнопки при загрузке страницы
    toggleButtonState(inputs, submitButton, config);
}

// Функция проверяет валидность введенных данных
function checkInputValidity(form, input, config) {
    // Находим элемент ошибки, связанный с данным полем ввода
    const errorElement = form.querySelector(`#${input.name}-error`);
    if (!errorElement) return; // Если элемента ошибки нет, ничего не делаем

    if (!input.validity.valid) {
        // Получаем стандартное сообщение об ошибке
        let errorMessage = input.validationMessage;

        // Если ошибка связана с patternMismatch и задано кастомное сообщение, используем его
        if (input.validity.patternMismatch && input.dataset.errorMessage) {
            errorMessage = input.dataset.errorMessage;
        }

        // Показываем сообщение об ошибке
        showInputError(input, errorElement, errorMessage, config);
    } else {
        // Скрываем сообщение об ошибке, если поле валидно
        hideInputError(input, errorElement, config);
    }
}

// Функция отображает ошибку валидации для конкретного поля
function showInputError(input, errorElement, errorMessage, config) {
    input.classList.add(config.inputErrorClass); // Добавляем класс ошибки к полю
    errorElement.textContent = errorMessage; // Устанавливаем текст ошибки
    errorElement.classList.add(config.errorClass); // Показываем сообщение об ошибке
}

// Функция скрывает ошибку валидации для конкретного поля
function hideInputError(input, errorElement, config) {
    input.classList.remove(config.inputErrorClass); // Убираем класс ошибки у поля
    errorElement.textContent = ''; // Очищаем текст ошибки
    errorElement.classList.remove(config.errorClass); // Скрываем сообщение об ошибке
}

// Функция включает/отключает кнопку отправки в зависимости от валидности формы
function toggleButtonState(inputs, button, config) {
    // Проверяем, есть ли в форме хотя бы одно невалидное поле
    const hasInvalidInput = inputs.some(input => !input.validity.valid);
    // Отключаем кнопку, если есть ошибки
    button.disabled = hasInvalidInput;
    // Добавляем или удаляем класс для неактивной кнопки
    button.classList.toggle(config.inactiveButtonClass, hasInvalidInput);
}

// Функция очищает ошибки валидации и приводит форму в исходное состояние
export function clearValidation(form, config) {
    // Находим все поля ввода в форме
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    // Находим кнопку отправки формы
    const submitButton = form.querySelector(config.submitButtonSelector);

    // Очищаем ошибки у каждого поля
    inputs.forEach(input => {
        const errorElement = form.querySelector(`#${input.name}-error`);
        if (errorElement) {
            hideInputError(input, errorElement, config);
        }
    });

    // Обновляем состояние кнопки отправки
    toggleButtonState(inputs, submitButton, config);
}
