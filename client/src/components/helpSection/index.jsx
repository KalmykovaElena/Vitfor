import React, { useState } from 'react';
import { Upload, Input } from 'antd';
import icon from 'assets/camera2.png';
import icon1 from 'assets/QuestionCircle.png';
import icon2 from 'assets/CheckCircle.png';

import './index.scss';
import FormInput from 'components/common/formInput';
import { useForm } from 'react-hook-form';
import { setHelpMessage } from 'http/setHelpMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { encodeImageFileAsURL } from 'utils/encodeImageFileAsURL';

const HelpSection = () => {
  const [fileList, setFileList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const {
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
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

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic';
    if (!isJpgOrPng) {
      setError('Ошибка загрузки файла. Допустимые форматы загружаемого фото: JPEG, PNG, HEIC');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      setError('Большой размер фотографии. Максимальный размер – 10 МБ');
    }
    return (isJpgOrPng && isLt10M) || Upload.LIST_IGNORE;
  };
  const onSubmit = (data) => {
    const formData = {
      text: data.message,
      files: fileList.map((e) => e.data),
    };
    setHelpMessage(formData, dispatch, navigate, setSuccess);
  };
  return (
    <section className={`help-wrapper help_${theme}`}>
      {success ? (
        <div className="help-title">
          <img className="help__icon" src={icon2} alt="help" />
          <h2>Ваш вопрос направлен в службу поддержки</h2>
        </div>
      ) : (
        <>
          <div className="help-title">
            <img className="help__icon" src={icon1} alt="help" />
            <h2>Задайте вопрос службе поддержки</h2>
          </div>
          <form className="help-submit" onSubmit={handleSubmit(onSubmit)}>
            <div className="help-label">Ваш вопрос</div>
            <TextArea
              rows={4}
              maxLength="3000"
              placeholder="Вопрос"
              className="help-text"
              onChange={(e) => setValue('message', e.target.value)}
            />
            <FormInput
              data={{ inputType: 'submit', id: 'input-submit' }}
              defaultValue="Отправить"
              isValid={isValid}
              isDirty={isDirty}
              error={errors}
            />
            {error && <div className="help-submit__error">{error}</div>}
            <Upload
              className="upload-item"
              defaultFileList={fileList}
              onChange={onChange}
              beforeUpload={beforeUpload}
              maxCount="10"
              customRequest={({ onSuccess }) => onSuccess('ok')}
            >
              <img className="upload-item__btn" src={icon} alt="upload" />
            </Upload>
            {fileList.length === 10 && (
              <div className="help-submit__error">Максимальное количество загружаемых изображений - 10</div>
            )}
          </form>
        </>
      )}
    </section>
  );
};
export default HelpSection;
