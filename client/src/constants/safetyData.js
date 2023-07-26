import phone from 'assets/Phone.png';
import lock from 'assets/Lock.png';
import check from 'assets/Vector-13.png';

export const safetyPageData = {
  phone: {
    title: 'Введите номер телефона/никнейм',
    title2: 'Введите новый номер телефона, который будет привязан к вашему аккаунту в Telegram/никнейм',
    attrs: { maxLength: '13' },
    label: 'Телефон/Никнейм',
    type: 'tel',
    placeholder: 'Телефон/ник',
    icon: phone,
    validateInput: {
      maxLength: {
        value: 13,
        message: 'Не более 13 символов',
      },
      required: 'Обязательное поле',
      pattern: {
        value: /^\+?[0-9]{1,13}$/,
        message: 'допустимые символы: + 0-9',
      },
    },
  },
  confirm: {
    title: 'Подтверждение номера телефона',
    title2: 'Введите код отправленный вам в смс',
    label: 'Код',
    type: 'tel',
    placeholder: 'Код',
    icon: check,
    validateInput: {
      required: 'Введите код из смс',
      pattern: {
        value: /^[0-9]{4,8}$/,
        message: 'допустимые символы: 0-9',
      },
    },
  },
  password: {
    title: 'Введите старый пароль',
    title2: 'Для привязки нового пароля необходимо ввести старый пароль',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Пароль',
    icon: lock,
    validateInput: {
      maxLength: {
        value: 20,
        message: 'Не более 20 символов',
      },
      minLength: {
        value: 8,
        message: 'Введите не менее 8 символов',
      },
      required: 'Пароль обязателен',
      pattern: {
        value: /^[a-zA-ZА-Я0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
        message:
          'Пароль может содержать следующие символы: ! @ # $ % ^ & * ( ) _ + - = { } [ ]  | : ; " \' < > , . ? /, A-Z, 0-9',
      },
      validate: {
        characters: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(value) ||
          'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную буквы',
      },
    },
  },
  resetpassword: {
    title: 'Привязка нового пароля',
    title2: 'Введите новый пароль',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Пароль',
    icon: lock,
    validateInput: {
      maxLength: {
        value: 20,
        message: 'Не более 20 символов',
      },
      minLength: {
        value: 8,
        message: 'Введите не менее 8 символов',
      },
      required: 'Пароль обязателен',
      pattern: {
        value: /^[a-zA-Z0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
        message:
          'Пароль может содержать следующие символы: ! @ # $ % ^ & * ( ) _ + - = { } [ ]  | : ; " \' < > , . ? /, A-Z, 0-9',
      },
      validate: {
        characters: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(value) ||
          'Пароль должен содержать минимум одну цифру, 1 заглавную и 1 строчную буквы',
      },
    },
  },
};
