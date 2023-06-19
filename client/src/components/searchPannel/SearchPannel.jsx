/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import './searchPannel.scss';

export default function SearchPannel() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (value) => {
    console.log(value.searchValue);

    reset();
  };
  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <input className="search-form__input text-input" type="text" {...register('searchValue')} placeholder="Поиск" />
      <input className="search-form__input search-input" type="submit" value="  " />
    </form>
  );
}
