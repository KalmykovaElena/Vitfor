import Select from 'components/common/select';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { range } from 'utils/range';
import { checkDate } from 'utils/checkDate';
import { setDaysNumber } from 'utils/setDaysNumber';

const DateSelect = ({ register, setValue, clearErrors, errors }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMounth, setSelectedMounth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysArray, setDaysArray] = useState(range(1, 31));
  const currentYear = new Date().getFullYear();
  const months = new Array(12).fill('').map((e, i) => new Date(2020, i).toLocaleString('default', { month: 'long' }));
  const years = range(currentYear, currentYear - 90);
  const mounthNumber = months.indexOf(selectedMounth);

  useEffect(() => {
    console.log('useEffect data select');
    if (selectedDay && selectedMounth && selectedYear) {
      if (!checkDate(selectedDay, mounthNumber, selectedYear)) {
        setDaysArray(range(1, setDaysNumber(selectedYear, mounthNumber)));
      }
      setValue('birthday', { day: selectedDay, mounth: mounthNumber, year: selectedYear });
      clearErrors('birthday');
    }
    if (selectedMounth && selectedYear) {
      setDaysArray(range(1, setDaysNumber(selectedYear, mounthNumber + 1)));
    }
    register('birthday', { required: 'Обязательное поле' });
  }, [clearErrors, mounthNumber, register, selectedDay, selectedMounth, selectedYear, setValue]);

  return (
    <div className="date">
      Дата рождения
      <div className="date-select">
        <Select data={daysArray} placeholder="ДД" onchangeSelect={setSelectedDay} error={errors.birthday} />
        <Select data={months} placeholder="ММ" onchangeSelect={setSelectedMounth} error={errors.birthday} />
        <Select data={years} placeholder="ГГ" onchangeSelect={setSelectedYear} error={errors.birthday} />
      </div>
      <dir className="date__error">{errors?.birthday?.message?.toString() || ''}</dir>
    </div>
  );
};

export default DateSelect;
