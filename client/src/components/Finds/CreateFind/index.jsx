/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.module.scss';
import img from '../../../assets/CheckCircle.png';
import Button from '../../common/button';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { Upload } from 'antd';
import { encodeImageFileAsURL } from '../../../utils/encodeImageFileAsURL';
import { beforeUploadFile } from '../../../helpers/beforeUploadFile';
import FormInput from '../../common/formInput';
import { useDispatch, useSelector } from 'react-redux';
import { setEditAdvert } from 'redux/reducers/advertReducer';
import { setService } from 'redux/reducers/serviseReduser';
import { updateFind } from 'http/Finds/updateFind';
import { createFind } from 'http/Finds/createFind';
import { findsCategories } from 'constants/findsData';

export const CreateFind = () => {
  const { advert, editAdvert, find } = useSelector((state) => ({
    editAdvert: state.advert.editAdvert,
    advert: state.advert.advert,
    find: state.find.find,
  }));
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: editAdvert.title,
      description: editAdvert.description,
      subsectionName: editAdvert.subsectionName,
    },
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
      fileStrings: fileList.map((e) => e.data),
      mainPhoto: fileList[0]?.data || null,
      sectionName: 'Finds',
    };
    currentData.price = '1'; // TODO удалить
    if (advertId) {
      updateFind({ ...currentData, findId: advertId }, setSuccess);
    } else {
      createFind(currentData, reset, setSuccess);
    }
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

  useEffect(
    () => () => {
      dispatch(setEditAdvert({}));
      dispatch(setService({}));
    },
    []
  );
  useEffect(() => {
    if (editAdvert.advertId && find.findId) {
      setFileList(
        find.files.map((item, index) => ({
          data: item.fileString,
          uid: `-${index}`,
          name: `image`,
          thumbUrl: `data:image/png;base64,${item.fileString}`,
        }))
      );
      setSelectedCategory(find.subsectionName);
      setValue('subsectionName', find.subsectionName);
      setValue('phoneNumber', find.phoneNumber);
    }
  }, [advert, find]);

  return (
    <section className={classNames(styles.wrapper, { [styles.wrapper_light]: theme === 'light' })}>
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
              navigate(success === 'Объявление успешно опубликовано' ? '/finds' : '/search/userads');
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
                {findsCategories.slice(0, 2).map((category) => (
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
                  >
                    <img src={category.img2} alt="category" />
                    <div>{category.label}</div>
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
                  disabled={disabledSubmit}
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
