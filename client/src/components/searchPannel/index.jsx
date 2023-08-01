import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useSelector } from 'react-redux';

const SearchPannel = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const theme = useSelector((state) => state.auth.theme);
  const onSubmit = (data) => {
    onSearch(data.searchValue);
    setInputValue(null);
    reset();
  };

  return (
    <div className="search">
      <form
        className={
          errors.searchValue
            ? `search-form search-form__formError search-form_${theme}`
            : `search-form search-form_${theme}`
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className={`search-form__input text-input${inputValue ? '__filled' : ''}`}
          type="text"
          {...register('searchValue', {
            onChange: (e) => {
              setInputValue(e.target.value);
            },
            maxLength: {
              value: 100,
              message: 'Не более 100 символов',
            },
            pattern: {
              value: /^[a-zA-ZА-Яа-я0-9_!@#$%^&*()_+"-={}|>?[\]]*$/,
              message: 'Допустимые символы: ! @ # $ % ^ & * ( ) _ + - = { } [ ]  | : ; " \' < > , . ? /, A-Z, 0-9',
            },
          })}
          placeholder="Поиск"
        />
        <input className={`search-form__input search-input${inputValue ? '__filled' : ''}`} type="submit" value="  " />
      </form>
      <div className="search-form__error ">{errors.searchValue?.message.toString() || ''}</div>
    </div>
  );
};
export default SearchPannel;
