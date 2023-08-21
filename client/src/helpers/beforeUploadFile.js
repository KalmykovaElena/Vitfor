import { Upload } from 'antd';

export const beforeUploadFile = (file, setErrorMessage) => {
  setErrorMessage('');
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic';
  if (!isJpgOrPng) {
    setErrorMessage('Ошибка загрузки файла. Допустимые форматы загружаемого фото: JPEG, PNG, HEIC');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    setErrorMessage('Большой размер фотографии. Максимальный размер – 10 МБ');
  }
  return (isJpgOrPng && isLt10M) || Upload.LIST_IGNORE;
};
