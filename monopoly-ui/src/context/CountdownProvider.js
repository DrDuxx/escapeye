import React, { useEffect, useState } from "react";
import CountdownContext from "./CountdownContext";

const CountdownProvider = ({ minutes, children }) => {
  const [timeLeft, setTimeLeft] = useState(minutes);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const resetCountdown = (timeLeft) => {
    setTimeLeft(timeLeft);
  };

  return (
    <CountdownContext.Provider value={{ timeLeft, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
};

export default CountdownProvider;
