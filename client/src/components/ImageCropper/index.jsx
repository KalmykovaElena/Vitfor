import React, { useRef, useState } from 'react';
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import rotateArrow from 'assets/rotate.png';
import './index.scss';
import Range from 'components/common/range';
import startIcon from 'assets/camera.png';
import endIcon from 'assets/camera2.png';

export default function ImageCropper({ src, onSave, isOpen }) {
  const [image, setImage] = useState();
  const cropperRef = useRef(null);

  const zoom = (e, prevValue) => {
    const value = e > prevValue ? 2 : 0.5;
    if (cropperRef.current) {
      cropperRef.current.zoomImage(value);
    }
  };
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

  return (
    <div className="crop-container">
      <div className="crop-main-block">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilComponent={CircleStencil}
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
          backgroundClassName="crop-bg"
          imageClassName="crop-img"
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
        <Range name="zoom" value="1" min="1" max="6" step="1" func={zoom} startIcon={startIcon} endIcon={endIcon} />
        <button
          type="button"
          className="controls-btn__button controls-btn__button-cancel"
          onClick={() => isOpen(false)}
        >
          Отмена
        </button>
        <button
          type="button"
          className="controls-btn__button"
          onMouseOver={onCrop}
          onFocus={onCrop}
          onClick={() => onSave(image)}
        >
          Загрузить
        </button>
      </div>
    </div>
  );
}
