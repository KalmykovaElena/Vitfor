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
    inputName: 'userName',
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
export const commentInput = {
  inputLabel: 'Комментарий',
  id: 'input-comment',
  inputType: 'text',
  inputName: 'comment',
  placeholder: 'Поле для ввода',

  validateInput: {
    maxLength: {
      value: 3000,
      message: 'Не более 3000 символов',
    },
    required: 'Обязательное поле',
    pattern: {
      value: /^[a-zA-ZА-Яа-я0-9_!\s@#$%^&*()_+"-={}|>?[\]]*$/,
      message: 'Допустимые символы: ! @ # $ % ^ & * ( ) _ + - = { } [ ] \\ | : ; " \' < > , . ? /, A-Z, А-Я, 0-9',
    },
  },
};
export const advertInputs = [
  {
    inputLabel: 'Название',
    id: 'input-advertName',
    inputType: 'text',
    inputName: 'title',
    placeholder: 'Название',
    validateInput: {
      maxLength: {
        value: 30,
        message: 'Не более 30 символов',
      },
      required: 'Обязательное поле',
      pattern: {
        value: /^[a-zA-ZА-Яа-я0-9_!\s@#$%^&*()_+"-={}|>?[\]]*$/,
        message: 'Неверное имя',
      },
    },
  },
  {
    inputLabel: 'Цена',
    id: 'input-advertPrice',
    inputType: 'number',
    inputName: 'price',
    placeholder: 'Цена',
    validateInput: {
      maxLength: {
        value: 10,
        message: 'Не более 10 символов',
      },
      required: 'Обязательное поле',
      pattern: {
        value: /^[0-9]*$/,
        message: 'Неверная цена',
      },
    },
  },
  // {
  //   renderType: 'advert-type',
  //   label: 'Выберите тип',
  // },
  {
    renderType: 'advert-description',
    label: 'Описание',
  },
  // {
  //   renderType: 'advert-upload',
  // },
  {
    inputLabel: 'Телефон',
    id: 'input-advertPhone',
    inputType: 'tel',
    inputName: 'phone',
    placeholder: 'Телефон',
    validateInput: {
      maxLength: {
        value: 13,
        message: 'Не более 13 символов',
      },
      pattern: {
        value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
        message: 'Неверная цена',
      },
    },
  },
  {
    inputType: 'submit',
    id: 'input-submit',
    inputValue: {
      'sale/adplacing': 'Сохранить',
    },
  },
];
