import mail from 'assets/Mail.png';
import phone from 'assets/Phone.png';

export const safetyPageData = {
  mail: {
    title: 'Привязка новой почты',
    title2: 'Введите адрес почты, которую Вы собираетесь привязать',
    label: 'Новая почта',
    type: 'email',
    placeholder: 'E-mail',
    icon: mail,
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
  },
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
        value: /^\+?[0-9]{7,13}$/,
        message: 'Неверный телефон',
      },
    },
  },
};
