/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import img from '../../../assets/CheckCircle.png';
import Button from '../../common/button';
import { PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { Upload, DatePicker } from 'antd';
import { encodeImageFileAsURL } from '../../../utils/encodeImageFileAsURL';
import { beforeUploadFile } from '../../../helpers/beforeUploadFile';
import FormInput from '../../common/formInput';
import { useSelector } from 'react-redux';
import { eventsCategories } from 'constants/eventsData';
import { createEvent } from 'http/Events/createEvent';
import { nanoid } from 'nanoid';

export const CreateEvent = () => {
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [checkedPrice, setCheckedPrice] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const theme = useSelector((state) => state.auth.theme);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    control,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const uploadButton = (
    <div>
      <PlusOutlined style={{ fill: '#f67f17' }} />
      <div></div>
    </div>
  );
  const onSubmit = (data) => {
    const currentData = {
      ...data,
      poster: fileList[0]?.data || null,
      sectionName: 'Events',
    };
    if (data.price === ' ') {
      currentData.price = '0';
    }
    createEvent(currentData, reset, setSuccess);
    setDisabledSubmit(true);
  };

  const onChange = ({ fileList: newFileList }) => {
    newFileList = newFileList.map((file, i) => {
      if (file.status) {
        encodeImageFileAsURL(file.originFileObj)
          // eslint-disable-next-line no-return-assign
          .then((result) => (file.data = result.split(',').splice(1).join('')));
        file.name = `Photo ${i + 1}`;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const onRemove = (file) => {
    setFileList((prevState) => prevState.filter((item) => item.uid !== file.uid));
  };

  return (
    <section id="createEvent" className={classNames(styles.wrapper, { [styles.wrapper_light]: theme === 'light' })}>
      {success ? (
        <div className={styles.success}>
          <img className={styles.successImg} src={img} alt="success" />
          <h2>Успех</h2>
          <div>{success}</div>
          <Button
            className={styles.button}
            name="В начало"
            type="primary"
            handleClick={() => {
              navigate(success && '/events');
            }}
          />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.uploadPhoto}>
            <div className={styles.title}>Загрузить фотографию</div>
            <Upload
              className={styles.uploadItem}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onRemove={onRemove}
              beforeUpload={(file) => beforeUploadFile(file, setErrorMessage)}
              maxCount="1"
              customRequest={({ onSuccess }) => onSuccess('ok')}
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <div className={styles.error}>{errorMessage}</div>
          </div>
          <div className={styles.container}>
            <div className={styles.titleAndCategory}>
              <div className={styles.serviceTitle}>
                <FormInput
                  className={styles.formInput}
                  data={{
                    inputLabel: 'Название',
                    id: 'input-serviceName',
                    inputType: 'text',
                    inputName: 'title',
                    placeholder: 'Название',
                    validateInput: {
                      maxLength: {
                        value: 100,
                        message: 'Не более 100 символов',
                      },
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[a-zA-ZА-Яа-я0-9_!\s@#$%^&*()_+"-={}|>?[\]]*$/,
                        message: 'Неверное имя',
                      },
                    },
                  }}
                  register={register}
                  error={errors}
                  watch={watch}
                  isDirty={isDirty}
                  isValid={isValid}
                />
              </div>
              <div className={styles.category}>
                <div className={styles.title}>Выбор категории</div>
                {eventsCategories.slice(0, 6).map((category) => (
                  <div
                    className={classNames(
                      styles.categoryItem,
                      { [styles.categoryItem_light]: theme === 'light' },
                      {
                        [styles.categoryActive]: selectedCategory === category.section,
                      }
                    )}
                    {...register('subsectionName', {
                      required: 'Обязательно поле',
                    })}
                    onClick={() => {
                      setSelectedCategory(category.section);
                      setValue('subsectionName', category.section);
                      clearErrors('subsectionName');
                    }}
                    key={nanoid()}
                  >
                    <div className={classNames(styles.categoryImg, { [styles.categoryImg_light]: theme === 'light' })}>
                      <img src={category.img} alt="category" />
                    </div>
                    <div>{category.name}</div>
                  </div>
                ))}
                {errors.subsectionName && <div className={styles.formError}>{errors.subsectionName?.message}</div>}
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.descriptionAndPrice}>
                <FormInput
                  className={styles.formInput}
                  data={{
                    inputLabel: 'Описание',
                    id: 'input-advertDescription',
                    inputType: 'text',
                    inputName: 'description',
                    placeholder: 'Описание',
                    validateInput: {
                      maxLength: {
                        value: 3000,
                        message: 'Не более 3000 символов',
                      },
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[a-zA-ZА-Яа-яёЁ0-9_!\s@#$%^&*()_+"-={}|>?[\]]*$/,
                        message: 'Неверное имя',
                      },
                    },
                  }}
                  maxLength="3001"
                  register={register}
                  error={errors}
                  watch={watch}
                  isDirty={isDirty}
                  isValid={isValid}
                />
                <FormInput
                  className={styles.formInput}
                  data={{
                    inputLabel: 'Адрес',
                    id: 'input-advertDescription',
                    inputType: 'text',
                    inputName: 'address',
                    placeholder: 'Адрес',
                    validateInput: {
                      maxLength: {
                        value: 3000,
                        message: 'Не более 3000 символов',
                      },
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[a-zA-ZА-Яа-яёЁ0-9_!\s@#$%^&*()_+"-={}|>?[\]]*$/,
                        message: 'Неверное имя',
                      },
                    },
                  }}
                  maxLength="3001"
                  register={register}
                  error={errors}
                  watch={watch}
                  isDirty={isDirty}
                  isValid={isValid}
                />
                <div className={styles.title}>Дата мероприятия</div>
                <div className={styles.dateInputs}>
                  <Controller
                    control={control}
                    name="StartDate"
                    rules={{
                      required: 'Выберите дату',
                    }}
                    render={({ field }) => (
                      <DatePicker
                        placeholder="с какого числа"
                        onChange={(_, dateString) => field.onChange(new Date(dateString))}
                        selected={field.value}
                        popupClassName="event-calendar"
                        getPopupContainer={() => document.getElementById('createEvent')}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="EndDate"
                    rules={{
                      required: 'Выберите дату',
                    }}
                    render={({ field }) => (
                      <DatePicker
                        placeholder="по какое число"
                        onChange={(_, dateString) => field.onChange(new Date(dateString))}
                        selected={field.value}
                        popupClassName="event-calendar"
                        getPopupContainer={() => document.getElementById('createEvent')}
                      />
                    )}
                  />
                  {(errors.dateStart || errors.dateEnd) && <div className={styles.formError}>Выберите дату</div>}
                </div>
              </div>
              <div>
                <div className={styles.checkPrice}>
                  {' '}
                  <span>Цена</span>
                  <label className={styles.check}>
                    <input
                      onClick={() => {
                        setCheckedPrice(!checkedPrice);
                        if (checkedPrice) {
                          setValue('price', ' ');
                        }
                      }}
                      onChange={() => {
                        setValue('price', ' ');
                      }}
                      checked={checkedPrice}
                      className={styles.radio}
                      type="radio"
                      value="Бесплатно"
                    />
                    <span>Бесплатно</span>
                  </label>
                </div>
                <FormInput
                  className={styles.formInput}
                  data={{
                    id: 'input-advertPrice',
                    inputType: 'text',
                    inputName: 'price',
                    placeholder: 'Цена, BYN',
                    validateInput: {
                      maxLength: {
                        value: 10,
                        message: 'Не более 10 символов',
                      },
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[0-9,.\s]*$/,
                        message: 'Неверная цена',
                      },
                    },
                  }}
                  register={register}
                  error={errors}
                  watch={watch}
                  isDirty={isDirty}
                  isValid={isValid}
                  disabled={checkedPrice}
                />
                <div className={styles.salesman}>
                  <div className={styles.title}>Телефон</div>
                  <FormInput
                    className={styles.formInput}
                    data={{
                      id: 'input-advertPhone',
                      inputType: 'tel',
                      inputName: 'phoneNumber',
                      placeholder: 'Телефон',
                      validateInput: {
                        maxLength: {
                          value: 15,
                          message: 'Не более 15 символов',
                        },
                        pattern: {
                          value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                          message: 'Допустимые символы + - 0-9',
                        },
                      },
                    }}
                    register={register}
                    error={errors}
                    watch={watch}
                    isDirty={isDirty}
                    isValid={isValid}
                  />
                </div>
                <div className={styles.controls}>
                  <FormInput
                    className={styles.formButton}
                    disabled={disabledSubmit}
                    data={{
                      inputType: 'submit',
                      id: 'input-submit',
                      inputValue: {
                        'events/createEvent': 'Разместить услугу',
                      },
                    }}
                    error={errors}
                  />
                  <Button
                    name="Отмена"
                    type="secondary"
                    className={styles.changeButton}
                    handleClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
