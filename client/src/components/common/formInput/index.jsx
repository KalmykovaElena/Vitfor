import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import icon from 'assets/eye.png';
import icon2 from 'assets/eye2.png';
import './index.scss';
import { setApproval } from 'redux/reducers/authReducer';

const FormInput = ({ data, ...inputProps }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const dispatch = useDispatch();
  const approval = useSelector((state) => state.auth.approval);
  const theme = useSelector((state) => state.auth.theme);
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const { inputLabel, id, inputType, placeholder, inputName, inputValue, validateInput } = data;
  const { register, error, watch, isDirty, isValid, setValue, defaultValue, ...restProps } = inputProps;
  const currentType = passwordShown ? 'text' : 'password';

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(`${inputName}`, defaultValue);
    }
  }, [defaultValue, inputName, setValue]);
  return (
    <>
      {inputType === 'submit' ? (
        <input
          type="submit"
          value={defaultValue || inputValue[currentPage]}
          className="form-button"
          disabled={
            restProps.disabled || (error ? (Object.keys(error).length === 0 ? false : !(isDirty && isValid)) : false)
          }
        />
      ) : (
        <label className={`formInput-label formInput-label__${inputType} ${inputType}-${inputName}`} htmlFor={id}>
          {inputName === 'confidentiality' ? (
            <Link className="safety-item-link" to="privacy">
              {inputLabel}
            </Link>
          ) : (
            <span>{inputLabel}</span>
          )}
          <input
            className={`${
              error[inputName] ? `formInput_inputError formInput-${inputType}_error ` : ''
            }formInput formInput-${inputType} formInput_${theme}`}
            type={inputType === 'password' ? currentType : inputType}
            placeholder={placeholder}
            id={id}
            checked={inputType === 'checkbox' && approval}
            onClick={() => inputName === 'confidentiality' && dispatch(setApproval(!approval))}
            onChange={inputType === 'password' ? watch((value) => setCurrentValue(value[inputName])) : null}
            {...register(`${inputName}`, validateInput)}
            {...restProps}
          />
          {inputType === 'password' && currentValue && (
            <img
              className="formInput-icon"
              src={passwordShown ? icon : icon2}
              alt="view password"
              role="presentation"
              onClick={() => togglePasswordVisiblity()}
            />
          )}
          <div className={`formInput-label__error error-${inputType}`}>
            {inputName === 'comment'
              ? error[inputName]?.message?.toString()
              : (error[inputName]?.message.length < 70 && error[inputName]?.message?.toString()) || ''}
          </div>
        </label>
      )}
    </>
  );
};
export default FormInput;
