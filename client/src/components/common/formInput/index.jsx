import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import icon from 'assets/eye.png';
import icon2 from 'assets/eye2.png';
import './index.scss';
import ToolTip from 'components/common/toolTip';

const FormInput = ({ data, ...inputProps }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const { inputLabel, id, inputType, placeholder, inputName, inputValue, validateInput } = data;
  const { register, error, watch, isDirty, isValid } = inputProps;
  const currentError = useSelector((state) => state.auth.currentError);
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const currentType = passwordShown ? 'text' : 'password';

  return (
    <>
      {inputType === 'submit' ? (
        <input
          type="submit"
          value={inputValue[currentPage]}
          className="authPannel-form__button"
          disabled={Object.keys(error).length === 0 ? false : !(isDirty && isValid)}
        />
      ) : (
        <label className={`formInput-label formInput-label__${inputType}`} htmlFor={id}>
          <span>{inputLabel}</span>
          <input
            className={`${error[inputType] ? 'formInput_inputError ' : ''}formInput formInput-${inputType}`}
            type={inputType === 'password' ? currentType : inputType}
            placeholder={placeholder}
            id={id}
            onChange={inputType === 'password' ? watch((value) => setCurrentValue(value[inputType])) : null}
            {...register(`${inputName}`, validateInput)}
          />
          {inputType === 'password' && currentValue && (
            <ToolTip text={passwordShown ? 'Скрыть пароль' : 'Показать пароль'}>
              <img
                className="formInput-icon"
                src={passwordShown ? icon : icon2}
                alt="view password"
                role="presentation"
                onClick={() => togglePasswordVisiblity()}
              />
            </ToolTip>
          )}
          <div className={`formInput-label__error error-${inputType}`}>
            {error[inputName]?.message?.toString() || currentError[inputName]}
          </div>
        </label>
      )}
    </>
  );
};
export default FormInput;
