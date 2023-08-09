/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Carousel from 'react-grid-carousel';
import arr from 'assets/arrow-right.svg';
import arrLeft from 'assets/arrow-left.svg';
import './index.scss';

const PhotoBlock = ({ files, onMainClick }) => {
  const [main, setMain] = useState(files[0].fileString);
  const handleClick = (el) => {
    setMain(el);
  };

  return (
    <div className="photo-block">
      <div className="photo-block__main">
        <img src={`data:image/png;base64,${main}`} alt="main" onClick={onMainClick} />
      </div>
      {files.length > 1 && (
        <div className="photo-block__additional">
          <Carousel
            cols={files.length > 3 ? 3 : files.length > 1 ? 2 : 1}
            rows={1}
            gap={10}
            loop
            arrowRight={
              files.length > 4 ? (
                <img
                  src={arr}
                  alt="arrow"
                  style={{ width: '26px', height: '26px', position: 'absolute', top: '40%', right: '2%', zIndex: '2' }}
                />
              ) : (
                <img src={arr} alt="arrow" style={{ display: 'none' }} />
              )
            }
            arrowLeft={
              files.length > 4 ? (
                <img
                  src={arrLeft}
                  alt="arrow"
                  style={{ width: '26px', height: '26px', position: 'absolute', top: '40%', left: '2%', zIndex: '2' }}
                />
              ) : (
                <img src={arrLeft} alt="arrow" style={{ display: 'none' }} />
              )
            }
          >
            {files.map(
              (e) =>
                e.fileString !== main && (
                  <Carousel.Item key={e.fileString}>
                    <img
                      width="100%"
                      src={`data:image/png;base64,${e.fileString}`}
                      alt="additional"
                      onClick={() => handleClick(e.fileString)}
                      role="presentation"
                    />
                  </Carousel.Item>
                )
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default PhotoBlock;
