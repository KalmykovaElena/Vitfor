/* eslint-disable react-hooks/exhaustive-deps */
import Select from 'components/common/select';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { range } from 'utils/range';
import { checkDate } from 'utils/checkDate';
import { setDaysNumber } from 'utils/setDaysNumber';

const DateSelect = ({ register, setValue, clearErrors, errors, defaultValue }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMounth, setSelectedMounth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysArray, setDaysArray] = useState(range(1, 31));
  const currentYear = new Date().getFullYear();
  const months = new Array(12).fill('').map((e, i) => new Date(2020, i).toLocaleString('default', { month: 'long' }));
  const years = range(currentYear, currentYear - 90);
  const mounthNumber = months.indexOf(selectedMounth);
  const date = defaultValue ? new Date(defaultValue) : null;

  useEffect(() => {
    if (defaultValue) {
      setValue('birthday', {
        day: date?.toLocaleDateString('ru-RU', { day: 'numeric' }),
        mounth: date?.toLocaleDateString('ru-RU', { month: 'numeric' }),
        year: date?.toLocaleDateString('ru-RU', { year: 'numeric' }),
      });
      setSelectedDay(Number(date?.toLocaleDateString('ru-RU', { day: 'numeric' })));
    }
    if (selectedDay && selectedMounth && selectedYear) {
      if (!checkDate(selectedDay, mounthNumber, selectedYear)) {
        setDaysArray(range(1, setDaysNumber(selectedYear, mounthNumber)));
      }
      setValue('birthday', { day: selectedDay, mounth: mounthNumber + 1, year: selectedYear });
      clearErrors('birthday');
    }
    if (selectedMounth && selectedYear) {
      setDaysArray(range(1, setDaysNumber(selectedYear, mounthNumber + 1)));
    }
    register('birthday', { required: 'Обязательное поле' });
  }, [clearErrors, defaultValue, mounthNumber, register, selectedDay, selectedMounth, selectedYear, setValue]);

  return (
    <div className="date">
      Дата рождения
      <div className="date-select">
        <Select
          data={daysArray}
          placeholder="ДД"
          onchangeSelect={setSelectedDay}
          error={errors.birthday}
          defaultValue={Number(date?.toLocaleDateString('ru-RU', { day: 'numeric' }))}
        />
        <Select
          data={months}
          placeholder="ММ"
          onchangeSelect={setSelectedMounth}
          error={errors.birthday}
          defaultValue={date?.toLocaleDateString('ru-RU', { month: 'long' })}
        />
        <Select
          data={years}
          placeholder="ГГ"
          onchangeSelect={setSelectedYear}
          error={errors.birthday}
          defaultValue={date?.toLocaleDateString('ru-RU', { year: 'numeric' })}
        />
      </div>
      <dir className="date__error">{errors?.birthday?.message?.toString() || ''}</dir>
    </div>
  );
};

export default DateSelect;
