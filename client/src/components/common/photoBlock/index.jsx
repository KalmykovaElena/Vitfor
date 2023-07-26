import React, { useState } from 'react';
import './index.scss';

const PhotoBlock = ({ files }) => {
  const [main, setMain] = useState(files[0]);
  // const [additionalArr, setAdditionalArr] = useState(files.slice(1));
  const handleClick = (el) => {
    // setAdditionalArr(files.filter((e) => e !== el));
    setMain(el);
  };

  return (
    <div className="photo-block">
      <div className="photo-block__main">
        <img src={main} alt="main" />
      </div>
      <div className="photo-block__additional">
        {files.map((e) =>
          e !== main ? (
            <img className="item-active" src={e} key={e} alt="additional" onClick={() => handleClick(e)} />
          ) : (
            <img className="item-hidden" src={e} key={e} alt="additional" />
          )
        )}
      </div>
    </div>
  );
};

export default PhotoBlock;
