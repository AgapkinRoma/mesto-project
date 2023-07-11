//импорты
import "./pages/index.css";
import Api from "./components/Api.js";
import { settings } from "./components/utilits.js";
import FormValidator from "./components/FormValidator";
import UserInfo from "./components/UserInfo";
import Card from "./components/Cards.js";
import PopupWithForm from "./components/PopupWithForm";
import PopupWithImage from "./components/PopupWithImage";
import Section from "./components/Section";
//объявление переменных
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const popupCards = document.querySelector(".popup_cards");
const formEditProfile = document.forms["profile-form"];
const formAddCard = document.forms["card-form"];
const popupAvatar = document.querySelector(".popup_avatar");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarForm = document.forms["avatar"];
const element = document.querySelector(".elements");
const popupPhotoScale = document.querySelector(".popup-img");
const nameInput = document.querySelector(".popup__name-input");
const jobInput = document.querySelector(".popup__job-input");

const api = new Api({
  basicUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "826428a0-055f-4d25-b211-48bad9e30bcd",
    "content-type": "application/json",
  },
});

//получение данных профиля и карточек с сервера
let userId = null;
Promise.all([api.userData(), api.getAllCards()])
  .then((data) => {
    const [user, cards] = data;
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);
    cardList.rendererItems(cards);
  })
  .catch((error) => {
    console.log(`Упс, Ошибка - ${error}`);
  });

//данные пользователя
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__status",
  ".profile__avatar"
);

//попап профиля
const popupProfile = new PopupWithForm({
  popup: popupEditProfile,

  callbackFormSubmit: (data) => {
    popupProfile.buttonLoading(true);

    api
      .editUserProfile(data)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        popupProfile.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.buttonLoading(false);
      });
  },
});

popupProfile.setEventListeners();
buttonOpenEditProfileForm.addEventListener("click", () => {
  const objectInfo = userInfo.getUserInfo();
  nameInput.value = objectInfo.name;
  jobInput.value = objectInfo.about;
  formValidatorEditProfile.resetValidation()
  popupProfile.openPopup();
});
//валидация попапа Профиля
const formValidatorEditProfile = new FormValidator(settings, formEditProfile);
formValidatorEditProfile.enableValidation();

//попап для добавление карточек
const popupCard = new PopupWithForm({
  popup: popupCards,
  callbackFormSubmit: (data) => {
    popupCard.buttonLoading(true);
    api
      .addCard(data)
      .then((res) => {
        cardList.addItemPrepend(createElementCard(res));
        popupCard.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCard.buttonLoading(false);
      });
  },
});
popupCard.setEventListeners();
buttonOpenAddCardForm.addEventListener("click", () => {
  formValidationFormAddCard.resetValidation()
  popupCard.openPopup();
});
//валидация попапа добавление карточки
const formValidationFormAddCard = new FormValidator(settings, formAddCard);
formValidationFormAddCard.enableValidation();

//попап обновления аватара
const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  callbackFormSubmit: (data) => {
    avatarPopup.buttonLoading(true);
    api
      .changeAvatar(data)
      .then((res) => {
        userInfo.setAvatar(res);
        avatarPopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.buttonLoading(false);
      });
  },
});
avatarPopup.setEventListeners();
avatarButton.addEventListener("click", () => {
formValidationAvatarForm.resetValidation()
  avatarPopup.openPopup();
});
//валидация попапа Аватар
const formValidationAvatarForm = new FormValidator(settings, avatarForm);
formValidationAvatarForm.enableValidation();

//попап большой картинки
const popupImage = new PopupWithImage({ popup: popupPhotoScale });
popupImage.setEventListeners();

//создание карточек
const createElementCard = (data) => {
  const card = new Card({
    templateSelector: "#element-template",
    data: data,
    userId: userId,
    dataId: data._id,

    showPopupPhotoScale: (data) => {
      popupImage.openPopup(data);
    },
    handleDeleteCard: () => {
      api
        .deleteCard(data._id)
        .then(() => {
          card.deleteCards();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLikeStatus: () => {
      api
        .addLike(data._id)
        .then((data) => {
          card.updateLike(data.likes);
        })
        .catch((error) => {
          console.log(`Упс, Ошибка -${error}`);
        });
    },
    handleLikeStatusDelete: () => {
      api
        .delLike(data._id)
        .then((data) => {
          card.updateLike(data.likes);
        })
        .catch((error) => {
          console.log(`Упс ошибка ${error}`);
        });
    },
  });
  return card.generate();
};
//рендер карточек
const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItemAppend(createElementCard(data));
    },
  },
  element
);
