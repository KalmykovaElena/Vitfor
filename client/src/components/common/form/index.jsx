import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../formInput';

const Form = ({ name, inputList, input, nameSubmit, handlerSubmit, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    handlerSubmit(data);
    console.log(data);
    reset();
  };

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
