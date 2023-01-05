import {
    buttonOpenPopupUser,
    popupUserInputName,
    popupUserInputJob,
    buttonPlus,
    photoContainer,
    profileJob,
    profileTitle,
} from '../utils/constants.js';

import { initialCards, validationConfig } from '../utils/utils.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//<--------------------------------- renderCards ------------------------------------------>

const cardList = new Section({
    items: initialCards,
    renderer: (item) => cardList.addItem(generateCard(item, '#template'))
}, photoContainer);

cardList.renderCard();

function generateCard(item, template) {
    const card = new Card(item, template, {
        handleCardClick: (link, name) => {
            openPopupFoto.open(link, name);
        }
    })
    const addCard = card.generateCard();

    return addCard;
}

//<--------------------------------- открытие карточки  --------------------------------->

const openPopupFoto = new PopupWithImage('.popup-foto');
openPopupFoto.setEventListeners();

//<--------------------------------- добавление новые карточки -------------------------->

function createInstanceCard(name, link, templateSelector) {
    return generateCard({ name, link }, templateSelector);
}

//<--------------------------------- передача имени и описания  ------------------------->

const inputValues = new UserInfo({
    name: '.profile__title',
    job: '.profile__subtitle'
});


const popupOpenProfile = new PopupWithForm('.popup-user', {
    submitForm: ({ name, profession }) => {
        inputValues.setUserInfo(name, profession);
    },
});

popupOpenProfile.setEventListeners();

//<--------------------------------- передача url и title  ------------------------->

const openAddFoto = new PopupWithForm('.popup-add', {
    submitForm: ({ popuoTitle, popuoImage }) => {
        cardList.addItem(createInstanceCard(popuoTitle, popuoImage, '#template'));
    },
});

openAddFoto.setEventListeners();

//<--------------------------------- evt на bt  ----------------------------------->

buttonOpenPopupUser.addEventListener('click', () => {
    popupOpenProfile.open();
    const inputList = inputValues.getUserInfo();
    popupUserInputName.value = inputList.name;
    popupUserInputJob.value = inputList.job;
    validFormUser.resetValidation();
})

buttonPlus.addEventListener('click', () => {
    openAddFoto.open();
    validFormPhoto.resetValidation();
})

//<--------------------------------- валидация inputs  ---------------------------->

const validFormUser = new FormValidator(validationConfig, '.form-user');
const validFormPhoto = new FormValidator(validationConfig, '.form-add');

validFormUser.enableValidation();
validFormPhoto.enableValidation();

