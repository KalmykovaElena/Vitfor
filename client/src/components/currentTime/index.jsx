import React, { useRef, useEffect, useState } from 'react';
import './index.scss';

const CurrentTime = ({ onLoad }) => {
  const [time, SetTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const timerRef = useRef(null);
  useEffect(() => {
    onLoad(false);
  }, [onLoad]);

  useEffect(() => {
    timerRef.current = setInterval(
      () => SetTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      1000
    );
    return () => clearTimeout(timerRef.current);
  }, [time]);

  return <span className="current-time">{time}</span>;
};
export default CurrentTime;
