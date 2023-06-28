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
        value: 50,
        message: 'Не более 50 символов',
      },
      required: 'Электронная почта обязательна',
      pattern: {
        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message: 'Неверный адрес электронной почты',
      },
    },
    pages: 'authorization,registration,recovery',
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
    },
    pages: 'authorization,registration,confirm',
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
      confirm: 'Подтвердить',
    },
    pages: 'authorization,registration,recovery,confirm',
  },
];
