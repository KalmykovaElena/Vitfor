import FormInput from 'components/common/formInput';
import { advertInputs } from 'constants/inputs';
import { Input, Upload } from 'antd';
import icon from 'assets/camera2.png';
import { saleData } from 'constants/saleData';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { encodeImageFileAsURL } from 'utils/encodeImageFileAsURL';
import './index.scss';
import { refreshToken } from 'http/refreshToken';
import { url } from 'constants/url';

const AdPlacingForm = () => {
  const [searchParms] = useSearchParams();
  const [fileList, setFileList] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    // reset,
    setError,
    setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const category = searchParms.get('category');
  const { items } = saleData.find((item) => item.link.slice(1) === category);
  const { TextArea } = Input;

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic';
    if (!isJpgOrPng) {
      setError('upload', { message: 'Ошибка загрузки файла. Допустимые форматы загружаемого фото: JPEG, PNG, HEIC' });
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      setError('upload', { message: 'Большой размер фотографии. Максимальный размер – 10 МБ' });
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
    console.log(fileList);
  };
  const onRemove = (file) => {
    setFileList((prevState) => prevState.filter((d) => d.uid !== file.uid));
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    const currentData = { ...data, phoneNumber: '123456789', fileStrings: fileList.map((e) => e.data) };
    console.log(currentData);
    fetch(`${url}/Adverts/CreateAdvert`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentData),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) {
            refreshToken(token);
          }
          const res = await response.json();
          console.log(res);
          throw new Error(res.message);
        }
        return response.json();
      })
      .then((result) => {
        // setSuccess(true);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (fileList.length >= 2) {
      setWarningMessage('Максимальное количество загружаемых изображений - 10');
    } else {
      setWarningMessage('');
    }
  }, [fileList.length]);

  return (
    <form className="adplacing-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="adplacing-form__inputs">
        {advertInputs.map((e) => {
          if (e.renderType === 'advert-description') {
            return (
              <div className="adplacing-form__description" key="adplacing-form__description">
                <TextArea
                  rows={4}
                  maxLength="3000"
                  placeholder="Описание"
                  className="help-text"
                  status={errors.description ? 'error' : ''}
                  {...register('description', {
                    onChange: (event) => setValue('description', event.target.value),
                    required: 'Обязательное поле',
                  })}
                />
                <div className="adplacing-form__error">{errors.description?.message}</div>
              </div>
            );
          }
          return (
            <FormInput
              key={e.id}
              data={e}
              register={register}
              error={errors}
              watch={watch}
              isDirty={isDirty}
              isValid={isValid}
            />
          );
        })}
      </div>
      <div>
        <div className="adplacing-form__type">
          {items.map((el) => (
            <label className="advert-abel" key={nanoid()}>
              <span>{el.label}</span>
              <input
                onChange={(e) => setValue('subSectionName', e.target.value)}
                className="advert-nput"
                type="radio"
                value={el.subsection}
                name="type"
                {...register('subSectionName', { required: 'Обязательное поле' })}
              />
            </label>
          ))}
          <div className="adplacing-form__error adplacing-form__error_right">{errors.subSectionName?.message}</div>
        </div>
        <div className="adplacing-form__upload">
          <Upload
            className="upload-item"
            fileList={fileList}
            onChange={onChange}
            onRemove={onRemove}
            beforeUpload={beforeUpload}
            maxCount="2"
            customRequest={({ onSuccess }) => onSuccess('ok')}
          >
            <img className="upload-item__btn" src={icon} alt="upload" />
          </Upload>
          <div className="adplacing-form__error">{warningMessage}</div>
        </div>
      </div>
    </form>
  );
};

export default AdPlacingForm;
