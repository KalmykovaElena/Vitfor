import React, { useRef, useEffect, useState } from 'react';

export default function CurrentTime() {
  const [time, SetTime] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(
      () => SetTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      1000
    );
    return () => clearTimeout(timerRef.current);
  }, [time]);

  return <span className="current-time">{time}</span>;
}
