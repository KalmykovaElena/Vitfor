import React, { useEffect, useRef, useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import rotateArrow from 'assets/rotate.png';
import './index.scss';

export default function ImageCropper({ src, onSave, isOpen }) {
  const [image, setImage] = useState();
  const cropperRef = useRef(null);

  const onChange = (cropper) => {
    if (cropper.getCanvas()) {
      setImage(cropper.getCanvas().toDataURL());
    }
  };
  const onCrop = () => {
    if (cropperRef.current) {
      setImage(cropperRef.current.getCanvas()?.toDataURL());
    }
  };
  const rotate = (angle) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
    }
  };
  const defaultVisibleArea = {
    width: 800,
    height: 775,
  };

  useEffect(() => {
    console.log(image);
    console.log(cropperRef.current);
  }, [image]);

  return (
    <div className="crop-container">
      <div className="crop-container__description">
        <div>Выбранная область будет показана на Вашей странице</div>
        <div>Если изображение ориентировано неправильно его можно повернуть</div>
      </div>
      <div className="crop-main-block">
        <Cropper
          src={src}
          ref={cropperRef}
          style={{
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          visibleArea={defaultVisibleArea}
          className="userCropper"
          stencilProps={{
            aspectRatio: 1 / 1,
          }}
          onChange={onChange}
        />
        <div className="crop-main-block__rotate">
          <img
            type="present"
            className="rotate-left"
            src={rotateArrow}
            alt="rotate right"
            onClick={() => rotate(-90)}
          />
          <img type="present" src={rotateArrow} alt="rotate right" onClick={() => rotate(90)} />
        </div>
      </div>

      <div className="controls-btn">
        <button
          type="button"
          className="controls-btn__button"
          onMouseOver={onCrop}
          onFocus={onCrop}
          onClick={() => onSave(image)}
        >
          Сохранить и продолжить
        </button>
        <button type="button" className="controls-btn__button" onClick={() => isOpen(false)}>
          Вернуться
        </button>
      </div>
    </div>
  );
}
