import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import img from '../../../assets/CheckCircle.png';
import Button from '../../common/button';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { Dropdown, Space, Upload } from 'antd';
import { encodeImageFileAsURL } from '../../../utils/encodeImageFileAsURL';
import { beforeUploadFile } from '../../../helpers/beforeUploadFile';
import FormInput from '../../common/formInput';
import { jobsCategories, jobsItems } from '../../../constants/Jobs/jobsData';
import { createServices } from '../../../http/Services/createServices';

export const CreateService = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [checkedPrice, setCheckedPrice] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
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
    const currentData = { ...data, fileList: fileList.map((e) => e.data), mainPhoto: fileList[0]?.data || null };
    if (data.price === ' ') {
      currentData.price = '0';
    }
    createServices(currentData, reset, setSuccess);
  };

  useEffect(() => {
    if (selectedSubCategory) {
      clearErrors('subSectionName');
    }
    if (checkedPrice) {
      clearErrors('price');
    }
  }, [checkedPrice, clearErrors, selectedSubCategory]);

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
  const handleCategoryClick = (domEvent, category) => {
    setSelectedSubCategory(domEvent.target.textContent);
    setSelectedCategory(category);
    const subsection = jobsItems.find((item) => item.label === domEvent.target.textContent);
    setValue('subsectionName', subsection.subsection);
    setValue('category', category === '1' ? 'I search' : 'I suggest');
  };
  return (
    <section className={classNames(styles.wrapper)}>
      {success ? (
        <div className={styles.success}>
          <img className={styles.successImg} src={img} alt="success" />
          <h2>Успех</h2>
          <div>Услуга успешно опубликована</div>
          <Button
            className={styles.button}
            name="В начало"
            type="primary"
            handleClick={() => {
              navigate('/services');
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
              maxCount="10"
              customRequest={({ onSuccess }) => onSuccess('ok')}
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
            <div className={styles.error}>{errorMessage}</div>
          </div>
          <div className={styles.container}>
            <div className={styles.titleAndCategory}>
              <div className={styles.serviceTitle}>
                <FormInput
                  className={styles.formInput}
                  data={{
                    inputLabel: 'Название товара/услуги',
                    id: 'input-serviceName',
                    inputType: 'text',
                    inputName: 'title',
                    placeholder: 'Например, телевизор',
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
                {jobsCategories.map((category) => (
                  <Dropdown
                    key={category.id}
                    menu={{
                      items: category.items,
                      onClick: (event) => {
                        handleCategoryClick(event.domEvent, category.id);
                      },
                      ...register('subsectionName', {
                        required: 'Обязательно поле',
                      }),
                    }}
                    overlayClassName={classNames(styles.dropDown)}
                  >
                    <Space>
                      <div
                        className={classNames(styles.categoryItem, {
                          [styles.categoryActive]:
                            category.items.find((item) => item.label === selectedSubCategory) &&
                            selectedCategory === category.id,
                        })}
                        style={{ order: category.order }}
                      >
                        <img src={category.img} alt="icon" className={styles.dropdownImg} />
                        <span>{category.name}</span>
                      </div>
                    </Space>
                  </Dropdown>
                ))}
                {!selectedSubCategory && <div className={styles.formError}>{errors.subsectionName?.message}</div>}
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
                <div>
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
              </div>
              <div>
                <div className={styles.salesman}>
                  <div className={styles.title}>О продавце</div>
                  <FormInput
                    className={styles.formInput}
                    data={{
                      id: 'input-advertPhone',
                      inputType: 'tel',
                      inputName: 'phoneNumber',
                      placeholder: 'Телефон',
                      validateInput: {
                        maxLength: {
                          value: 13,
                          message: 'Не более 13 символов',
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
                <FormInput
                  className={styles.formButton}
                  data={{
                    inputType: 'submit',
                    id: 'input-submit',
                    inputValue: {
                      'sale/adplacing': 'Разместить услугу',
                    },
                  }}
                  error={errors}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
