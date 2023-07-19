export const authInputs = [
  {
    inputLabel: 'Почта',
    id: 'input-email',
    inputType: 'email',
    placeholder: 'E-mail',
    inputName: 'email',
    required: 'Электронная почта обязательна',
    validateInput: {
      maxLength: {
        value: 30,
        message: 'Не более 30 символов',
      },
      required: 'Электронная почта обязательна',
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: 'Неверный адрес электронной почты',
      },
    },
    pages: 'authorization,registration,recovery,confirm',
  },
  {
    inputLabel: 'Пароль',
    id: 'input-password',
    inputType: 'password',
    placeholder: 'Не менее 8 символов',
    inputName: 'password',
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
    pages: 'authorization,registration,Auth/ResetPassword.confirm',
  },

  {
    inputLabel: 'Я соглашаюсь с политикой конфиденциальности',
    id: 'input-checkbox',
    inputType: 'checkbox',
    inputName: 'confidentiality',
    validateInput: {
      required: 'Вы должны согласиться с политикой конфиденциальности',
    },
    pages: 'registration',
  },
  {
    inputType: 'submit',
    id: 'input-submit',
    inputValue: {
      authorization: 'Войти',
      registration: 'Зарегистрироваться',
      recovery: 'Запросить',
      'Auth/ResetPassword': 'Подтвердить',
    },
    pages: 'authorization,registration,recovery,confirm,Auth/ResetPassword',
  },
];

export const personalDataInputs = [
  {
    inputLabel: 'Отображаемое имя',
    id: 'input-nickName',
    inputType: 'text',
    inputName: 'nickName',
    placeholder: 'Отображаемое имя',
    validateInput: {
      maxLength: {
        value: 30,
        message: 'Не более 30 символов',
      },
      required: 'Обязательное поле',
      pattern: {
        value: /^[a-zA-ZА-Яа-я0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
        message: 'Неверное имя',
      },
    },
  },
  {
    inputLabel: 'Имя пользователя',
    id: 'input-name',
    inputType: 'text',
    inputName: 'name',
    placeholder: 'Имя',
    validateInput: {
      maxLength: {
        value: 30,
        message: 'Не более 30 символов',
      },
      required: 'Обязательное поле',
      pattern: {
        value: /^[a-zA-ZА-Яа-я0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
        message: 'Неверное имя',
      },
    },
  },
  {
    renderType: 'select-block',
    label: 'Дата рождения',
  },
  {
    renderType: 'safety-data',
  },
  {
    inputType: 'submit',
    id: 'input-submit',
    inputValue: {
      'personal_info/data': 'Сохранить',
    },
  },
];
