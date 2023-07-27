import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.scss';

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return <RightOutlined style={{ fontSize: '20px', color: '#000' }} className={className} onClick={onClick} />;
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className}>
      <LeftOutlined style={{ fontSize: '20px', color: '#000' }} onClick={onClick} />
    </div>
  );
};

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Slider = ({ files }) => (
  <div style={{ padding: '50px' }}>
    <Carousel arrows {...settings} dots={false}>
      {files.map((e) => (
        <div className="slider-item" key={e}>
          <img src={e} alt="advert" />
        </div>
      ))}
    </Carousel>
  </div>
);

export default Slider;
