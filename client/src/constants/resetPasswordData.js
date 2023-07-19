import lock from 'assets/Lock.png';

export const resetPasswordData = {
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
      required: 'Обязательно для заполнения',
      pattern: {
        value: /^[a-zA-ZА-Я0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
        message:
          'Пароль может содержать следующие символы: ! @ # $ % ^ & * ( ) _ + - = { } [ ]  | : ; " \' < > , . ? /, A-Z, 0-9',
      },
      validate: {
        characters: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(value) ||
          'Пароль должен содержать минимум 1 цифру, 1 заглавную и 1 строчную буквы',
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
};
