import React, { useState } from 'react';
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
      <div className="photo-block__additional">
        {files.map((e) =>
          e.fileString !== main ? (
            <div className="item item-active" key={e.fileString}>
              <img
                src={`data:image/png;base64,${e.fileString}`}
                alt="additional"
                onClick={() => handleClick(e.fileString)}
              />
            </div>
          ) : (
            <div className="item item-hidden" key={e}>
              <img src={`data:image/png;base64,${e.fileString}`} alt="additional" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PhotoBlock;
