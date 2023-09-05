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
// import { updateFind } from 'http/Finds/updateFind';
// import { createFind } from 'http/Finds/createFind';
import { forumCategories } from 'constants/forumData';
import { createForumTheme } from 'http/Forum/createForumTheme';
// import { findsCategories } from 'constants/findsData';

const CreateTheme = () => {
  //   const { advert, editAdvert, find } = useSelector((state) => ({
  //     editAdvert: state.advert.editAdvert,
  //     advert: state.advert.advert,
  //     find: state.find.find,
  //   }));
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  //   const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const theme = useSelector((state) => state.auth.theme);
  const {
    register,
    handleSubmit,
    // clearErrors,
    formState: { errors, isValid, isDirty },
    reset,
    // setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // defaultValues: {
    //   title: editAdvert.title,
    //   description: editAdvert.description,
    //   subsectionName: editAdvert.subsectionName,
    // },
  });

  const uploadButton = (
    <div>
      <PlusOutlined style={{ fill: '#f67f17' }} />
      <div></div>
    </div>
  );
  const onSubmit = (data) => {
    const subsectionName = forumCategories.find((category) => category.link === `/${params.category}`).section;
    const currentData = {
      ...data,
      fileStrings: fileList.map((e) => e.data),
      mainPhoto: fileList[0]?.data || null,
      sectionName: 'Forum',
      subsectionName,
    };
    console.log(currentData);
    // if (params.advertId) {
    //   updateFind({ ...currentData, findId: params.advertId }, setSuccess);
    // } else {
    createForumTheme(currentData, reset, setSuccess);
    // }
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
  //   useEffect(() => {
  //     if (editAdvert.advertId && find.findId) {
  //       setFileList(
  //         find.files.map((item, index) => ({
  //           data: item.fileString,
  //           uid: `-${index}`,
  //           name: `image`,
  //           thumbUrl: `data:image/png;base64,${item.fileString}`,
  //         }))
  //       );
  //       setSelectedCategory(find.subsectionName);
  //       setValue('subsectionName', find.subsectionName);
  //       setValue('phoneNumber', find.phoneNumber);
  //     }
  //   }, [advert, find]);

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
              navigate(`/forum/${params.category}`);
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
            <div className={styles.themeTitle}>
              <FormInput
                className={styles.formInput}
                data={{
                  inputLabel: 'Название темы',
                  id: 'input-themeName',
                  inputType: 'text',
                  inputName: 'title',
                  placeholder: 'Например, спорт',
                  validateInput: {
                    maxLength: {
                      value: 300,
                      message: 'Не более 300 символов',
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

            <div className={styles.description}>
              <FormInput
                className={styles.formInput}
                data={{
                  inputLabel: 'Описание',
                  id: 'input-themeDescription',
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
            <div className={styles.controls}>
              <FormInput
                className={styles.formButton}
                disabled={disabledSubmit}
                data={{
                  inputType: 'submit',
                  id: 'input-submit',
                  inputValue: {
                    [`forum/${params.category}/createTheme`]: 'Создать тему',
                  },
                }}
                error={errors}
              />
              <Button
                name="Отмена"
                type="secondary"
                className={styles.changeButton}
                handleClick={() => {
                  navigate(`/forum/${params.category}`);
                }}
              />
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default CreateTheme;
