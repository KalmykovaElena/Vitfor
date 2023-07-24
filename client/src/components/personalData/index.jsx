import FormInput from 'components/common/formInput';
import { personalDataInputs } from 'constants/inputs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import DateSelect from 'components/dateSelect';
import checkmark from 'assets/checkmark-circle.png';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from 'redux/reducers/authReducer';
import ImageCropper from 'components/ImageCropper';
import { Tooltip, ColorPicker } from 'antd';
import { updateUserData } from 'http/updateUserData';
import { useNavigate } from 'react-router-dom';
import SafetyData from 'components/safetyData';

const PersonalData = () => {
  const [isSend, setIsSend] = useState(false);
  const [isCropeOpen, setIsCropeOpen] = useState(false);
  const [initialImage, setInitialImage] = useState();
  const [savedlImage, setSavedImage] = useState();
  const [profileColor, setProfileColor] = useState();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const avatar = user.photo?.includes('data:image') ? user.photo : null;
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJpgOrPng) {
        setError('Ошибка загрузки файла. Допустимые форматы загружаемого фото: JPEG, PNG, HEIC');
      } else if (!isLt10M) {
        setError('Большой размер фотографии. Максимальный размер – 10 МБ');
      } else {
        setInitialImage(URL.createObjectURL(file));
        setIsCropeOpen(true);
      }
    }
  };
  const handleFileSave = (value) => {
    setSavedImage(value);
    setIsCropeOpen(false);
  };
  const onSubmit = (data) => {
    let formData = {
      nickName: data.nickName,
      userName: data.userName,
      dayOfBirth: data.birthday.day,
      monthOfBirth: data.birthday.mounth,
      yearOfBirth: data.birthday.year,
    };

    if (savedlImage) {
      formData = { ...formData, photo: savedlImage };
    } else if (profileColor) {
      formData = { ...formData, photo: profileColor };
    }
    dispatch(setProfileData(formData));
    updateUserData(formData, dispatch, navigate, setIsSend);
  };

  useEffect(() => {
    setIsSend(false);
  }, []);

  return (
    <section className="personalData">
      <form
        className={isCropeOpen ? 'personalData-form personalData-form__hide' : 'personalData-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="personalData-wrapper">
          <div className="personalData-name">Личные данные</div>
          {personalDataInputs.map((e) => {
            if (e.renderType === 'select-block') {
              return (
                <DateSelect
                  key="select-block"
                  register={register}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  errors={errors}
                  defaultValue={user.birthDate}
                />
              );
            }
            if (e.renderType === 'safety-data') {
              return <SafetyData key={e.renderType} />;
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
                setValue={setValue}
                defaultValue={user[e.inputName]}
              />
            );
          })}
          <div className={isSend ? 'personalData-success' : 'personalData-success__hide'}>
            Успешно сохранено <img src={checkmark} alt="checkmark" />
          </div>
        </div>
        <div className="personalData-image">
          {savedlImage || avatar ? (
            <div className="personalData-image__src">
              <img src={savedlImage || avatar} alt="profile avatar" />
            </div>
          ) : (
            <ColorPicker
              onChange={(color) => setProfileColor(color.toHexString())}
              onColorResult={(color) => color.hex}
            >
              <Tooltip title="сменить цвет" color="orange" overlayInnerStyle={{ color: 'black' }}>
                <div className={`personalData-image__src personalData-image__src_${theme} personal-logo`}>
                  <span style={{ color: profileColor || user.photo }}>
                    {user.userName ? user.userName.slice(0, 1).toUpperCase() : 'V'}
                  </span>
                </div>
              </Tooltip>
            </ColorPicker>
          )}
          <label htmlFor="file-upload" className="file-upload">
            {savedlImage ? 'Изменить фото' : ' Загрузить фото'}
          </label>
          <input
            id="file-upload"
            type="file"
            title=" "
            className="form-element__input input-file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {error && <div className="file-upload__error">{error}</div>}
        </div>
      </form>

      {isCropeOpen && <ImageCropper src={initialImage} onSave={handleFileSave} isOpen={setIsCropeOpen} />}
    </section>
  );
};
export default PersonalData;
