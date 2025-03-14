(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"7c4a5e19-3e7e-46c2-805c-562cedf541ca","Content-Type":"application/json"}};function t(e){return e.ok?e.json():e.json().then((function(t){return Promise.reject("Ошибка ".concat(e.status,": ").concat(t.message||"Нет данных"))}))}function n(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button"),i=c.querySelector(".card__image"),l=c.querySelector(".card__title"),s=c.querySelector(".card__like-count");return i.setAttribute("src",e.link),i.setAttribute("alt",e.name),l.textContent=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&a.classList.add("card__like-button_is-active"),e.owner._id!==t?u.remove():u.addEventListener("click",(function(){return r(c,e._id)})),a.addEventListener("click",(function(){return n(a,e._id,s)})),i.addEventListener("click",(function(){return o(e)})),c}function r(n,r,o){var c=n.classList.contains("card__like-button_is-active");(function(n,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:r,headers:e.headers}).then(t)})(r,c?"DELETE":"PUT").then((function(e){o.textContent=e.likes.length,n.classList.toggle("card__like-button_is-active",!c)})).catch((function(e){return console.error("Ошибка постановки/снятия лайка:",e)}))}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function a(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)}function i(e,t,n){var r=e.some((function(e){return!e.validity.valid}));t.disabled=r,t.classList.toggle(n.inactiveButtonClass,r)}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){var r=e.querySelector("#".concat(n.name,"-error"));r&&a(n,r,t)})),i(n,r,t)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,d=document.querySelector(".content").querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),S=f.querySelector('.popup__form[name="edit-profile"]'),b=document.querySelector(".popup_type_avatar"),q=b.querySelector('.popup__form[name="avatar-form"]'),C=b.querySelector(".popup__input_type_url"),E=_.querySelector('.popup__form[name="new-place"]'),g=_.querySelector(".popup__input_type_card-name"),k=_.querySelector(".popup__input_type_url"),L=f.querySelector(".popup__input_type_name"),x=f.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__add-button"),w=document.querySelectorAll(".popup__close"),T=document.querySelectorAll(".popup"),j=m.querySelector(".popup__image"),O=m.querySelector(".popup__caption"),P=document.querySelector(".popup_type_delete"),B=P.querySelector(".popup__button_confirm"),D=E.querySelector(".popup__button"),I=null,M=null,N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input-error",errorClass:"popup__error_visible"};function J(e){j.src=e.link,j.alt=e.name,O.textContent=e.name,c(m)}function H(e,t){!function(e,t){I=e,M=t,c(P)}(e,t)}!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#".concat(t.name,"-error"));if(r)if(t.validity.valid)a(t,r,n);else{var o=t.validationMessage;t.validity.patternMismatch&&t.dataset.errorMessage&&(o=t.dataset.errorMessage),function(e,t,n,r){e.classList.add(r.inputErrorClass),t.textContent=n,t.classList.add(r.errorClass)}(t,r,o,n)}}(e,o,t),i(n,r,t)}))})),e.addEventListener("reset",(function(){setTimeout((function(){l(e,t)}),0)})),i(n,r,t)}(t,e)}))}(N),A.addEventListener("click",(function(){L.value=y.textContent,x.value=v.textContent,l(S,N),c(f)})),U.addEventListener("click",(function(){l(E,N),c(_)})),w.forEach((function(e){e.addEventListener("click",(function(e){u(e.target.closest(".popup"))}))})),T.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&u(e)}))})),S.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=D.textContent;D.textContent="Сохранение...",(r=L.value,o=x.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){y.textContent=e.name,v.textContent=e.about,u(f)})).catch((function(e){return console.error("Ошибка при обновлении профиля:",e)})).finally((function(){return D.textContent=c}))})),E.addEventListener("submit",(function(o){o.preventDefault();var c,a=D.textContent;D.textContent="Сохранение...",(c={name:g.value,link:k.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c.name,link:c.link})}).then(t)).then((function(e){var t=n(e,p,r,H,J);d.prepend(t),u(_),E.reset(),l(E,N)})).catch((function(e){return console.error("Ошибка добавления карточки:",e)})).finally((function(){return D.textContent=a}))})),B.addEventListener("click",(function(){var n;M&&I&&(n=M,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)).then((function(){I.remove(),u(P),I=null,M=null})).catch((function(e){return console.error("Ошибка удаления:",e)}))})),h.addEventListener("click",(function(){C.value="",l(q,N),c(b)})),q.addEventListener("submit",(function(n){n.preventDefault();var r,o=q.querySelector(".popup__button"),c=o.textContent;o.textContent="Сохранение...",(r=C.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){h.style.backgroundImage="url(".concat(e.avatar,")"),u(b)})).catch((function(e){return console.error("Ошибка обновления аватара: ".concat(e))})).finally((function(){return o.textContent=c}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,o,c=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,o)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],a=c[1];p=u._id,y.textContent=u.name,v.textContent=u.about,h.style.backgroundImage="url(".concat(u.avatar,")"),a.forEach((function(e){var t=n(e,p,r,H,J);d.append(t)}))})).catch((function(e){console.error("❌ Ошибка загрузки данных: ".concat(e))}))})();