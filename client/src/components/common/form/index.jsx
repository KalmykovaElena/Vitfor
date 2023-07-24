import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../formInput';

const Form = ({ name, inputList, input, nameSubmit, handlerSubmit, setPasswordError, leterReset, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setError,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const passwordError = useMemo(() => (errors.password ? errors.password : ''), [errors.password]);
  const onSubmit = (data) => {
    handlerSubmit(data, setError, reset);
    if (!leterReset) {
      reset();
    }
  };

  useEffect(() => {
    setPasswordError(passwordError);
  }, [passwordError, setPasswordError]);

  return (
    <form className={name ? `form form-${name}` : 'form'} onSubmit={handleSubmit(onSubmit)}>
      {inputList &&
        inputList.map((e) => (
          <FormInput
            key={e.id}
            data={e}
            register={register}
            error={errors}
            watch={watch}
            isDirty={isDirty}
            isValid={isValid}
            {...props}
          />
        ))}
      {input && (
        <FormInput
          data={input}
          register={register}
          error={errors}
          watch={watch}
          isDirty={isDirty}
          isValid={isValid}
          {...props}
        />
      )}
      <FormInput
        data={{ inputType: 'submit', id: 'input-submit' }}
        defaultValue={nameSubmit || 'Отправить'}
        isValid={isValid}
        isDirty={isDirty}
        error={errors}
      />
    </form>
  );
};

export default Form;
