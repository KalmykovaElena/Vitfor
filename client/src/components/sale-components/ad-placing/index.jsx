import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-multi-carousel/lib/styles.css';
import { Dropdown, Space, Upload } from 'antd';
import { encodeImageFileAsURL } from 'utils/encodeImageFileAsURL';
import { useForm } from 'react-hook-form';
import { PlusOutlined } from '@ant-design/icons';
import FormInput from 'components/common/formInput';
import { saleData } from 'constants/saleData';
import img from 'assets/CheckCircle.png';
import Button from 'components/common/button';
import { useNavigate } from 'react-router-dom';
import { setAdver } from 'http/setAdvert';

const AdPlacing = () => {
  const theme = useSelector((state) => state.auth.theme);
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [checkedPrice, setCheckedPrice] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
    reset,
    setError,
    setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const beforeUpload = (file) => {
    setErrorMessage('');
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic';
    if (!isJpgOrPng) {
      setErrorMessage('Ошибка загрузки файла. Допустимые форматы загружаемого фото: JPEG, PNG, HEIC');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      setErrorMessage('Большой размер фотографии. Максимальный размер – 10 МБ');
    }
    return (isJpgOrPng && isLt10M) || Upload.LIST_IGNORE;
  };
  const onChange = ({ fileList: newFileList }) => {
    newFileList = newFileList.map((file, i) => {
      encodeImageFileAsURL(file.originFileObj)
        // eslint-disable-next-line no-return-assign
        .then((res) => (file.data = res.split(',').splice(1).join('')));
      file.name = `Photo ${i + 1}`;
      return file;
    });
    setFileList(newFileList);
  };
  const onRemove = (file) => {
    setFileList((prevState) => prevState.filter((d) => d.uid !== file.uid));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div></div>
    </div>
  );
  const onSubmit = (data) => {
    const currentData = { ...data, fileStrings: fileList.map((e) => e.data) };
    console.log(currentData);
    setAdver(currentData, dispatch, navigate, reset, fileList, setSuccess);
  };
  const handleCategoryClick = ({ domEvent }) => {
    setSelectedCategory(domEvent.target.textContent);
    const { subsection } = saleData
      .find((item) => item.items?.find((e) => e.label === domEvent.target.textContent))
      .items.find((e) => e.label === domEvent.target.textContent);
    setValue('subSectionName', subsection);
  };

  const curprice = watch('price');
  useEffect(() => {
    if (selectedCategory) {
      clearErrors('subSectionName');
    }
    if (curprice && +curprice === 0) {
      setCheckedPrice(true);
    } else {
      setCheckedPrice(false);
    }
  }, [clearErrors, curprice, selectedCategory]);

  return (
    <section className={`adplacing adplacing__${theme}`}>
      {success ? (
        <div className="adplacing-success">
          <img className="adplacing-success-img" src={img} alt="success" />
          <h2>Успех</h2>
          <div>Объявление успешно опубликовано</div>
          <Button name="В начало" type="primary" handleClick={() => navigate('/sale')} />
        </div>
      ) : (
        <form className="adplacing-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="adplacing-form-upload">
            <div className="adplacing-form__title">Загрузить фотографию</div>
            <Upload
              className="upload-item"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onRemove={onRemove}
              beforeUpload={beforeUpload}
              maxCount="10"
              customRequest={({ onSuccess }) => onSuccess('ok')}
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length >= 10 ? null : uploadButton}
            </Upload>
            <div className="adplacing-form__error">{errorMessage}</div>
          </div>
          <div className="adplacing-form-container">
            <div className="adplacing-form-container__block">
              <FormInput
                data={{
                  inputLabel: 'Название товара/услуги',
                  id: 'input-advertName',
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
              <div className="category">
                <div className="adplacing-form__title">Выбор категории</div>
                <div className="category-items">
                  {saleData.slice(4).map((e) => (
                    <Dropdown
                      key={e.id}
                      menu={{
                        items: e.items,
                        onClick: handleCategoryClick,

                        ...register('subSectionName', {
                          required: 'Обязательное поле',
                        }),
                      }}
                      overlayClassName={`navigation-dropdown navigation-dropdown__${theme}`}
                    >
                      <Space>
                        <div
                          className={
                            e.items.find((item) => item.label === selectedCategory)
                              ? 'category-item category-item_active'
                              : 'category-item'
                          }
                          style={{ order: e.order }}
                        >
                          <img src={e.icon} alt="icon" className="navigation-dropdown__img" />
                          <span>{e.name}</span>
                        </div>
                      </Space>
                    </Dropdown>
                  ))}
                </div>
                {!selectedCategory && <div className="adplacing-form__error">{errors.subSectionName?.message}</div>}
              </div>
            </div>
            <div className="adplacing-form-container__block">
              <div className="block-info">
                <FormInput
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
                  <label className="advert-label__check">
                    <span>Цена</span>
                    <input
                      onClick={() => {
                        const price = getValues('price');
                        if (price === '0') {
                          setValue('price', '');
                          setError('price', { message: 'Обязательное поле' });
                        }
                        // setCheckedPrice(!checkedPrice);
                      }}
                      onChange={(e) => {
                        setValue('price', e.target.value);
                        clearErrors('price');
                      }}
                      checked={checkedPrice}
                      className="advert-input"
                      type="radio"
                      value="0"
                    />
                    <span>Бесплатно</span>
                  </label>
                  <FormInput
                    data={{
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
                    }}
                    register={register}
                    error={errors}
                    watch={watch}
                    isDirty={isDirty}
                    isValid={isValid}
                  />
                </div>
              </div>
              <div className="block-info">
                <div className="adplacing-form__title">О продавце</div>
                <div>
                  <label className="advert-label__check">
                    <span>Телефон</span>
                    <input
                      // onChange={(e) => {
                      // }}
                      // checked={}
                      className="advert-nput"
                      type="radio"
                    />
                    <span>Скрыть телефон</span>
                  </label>
                  <FormInput
                    data={{
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
                    }}
                    register={register}
                    error={errors}
                    watch={watch}
                    isDirty={isDirty}
                    isValid={isValid}
                  />
                </div>
              </div>
              <FormInput
                data={{
                  inputType: 'submit',
                  id: 'input-submit',
                  inputValue: {
                    'sale/adplacing': 'Подать объявление',
                  },
                }}
                error={errors}
              />
            </div>
          </div>
        </form>
      )}
      {/* {searchParms.size > 0 ? (
        <AdPlacingForm />
      ) : (
        <div className="adplacing-wrapper">
          <div className="adplacing-title">Выберите категорию</div>
          <div className="adplacing-content">
            {saleData.slice(4).map((e) => (
              <div
                key={e.id}
                className="adplacing-content__item"
                style={{ borderColor: e.color.dark, color: e.color.dark }}
                onClick={() => setSearchParams({ category: e.link.slice(1) })}
              >
                <img src={e.img} alt="icon" />
                <span className="item__name">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </section>
  );
};

export default AdPlacing;
