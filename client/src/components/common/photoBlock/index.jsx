import React, { useState } from 'react';
import './index.scss';

const PhotoBlock = ({ files, onMainClick }) => {
  const [main, setMain] = useState(files[0]);
  const handleClick = (el) => {
    setMain(el);
  };

  return (
    <div className="photo-block">
      <div className="photo-block__main">
        <img src={main} alt="main" onClick={onMainClick} />
      </div>
      <div className="photo-block__additional">
        {files.map((e) =>
          e !== main ? (
            <div className="item item-active" key={e}>
              <img src={e} alt="additional" onClick={() => handleClick(e)} />
            </div>
          ) : (
            <div className="item item-hidden" key={e}>
              <img src={e} alt="additional" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PhotoBlock;
