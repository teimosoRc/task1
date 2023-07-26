import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const handleSetTime = () => {
    const timeArray = inputTime.split(":");
    const hours = parseInt(timeArray[0]) || 0;
    const minutes = parseInt(timeArray[1]) || 0;
    const seconds = parseInt(timeArray[2]) || 0;
    const newTime = hours * 3600 + minutes * 60 + seconds;

    setTime(newTime);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Таймер</h1>
      <div>
        <p>Введите время для обратного отсчета в формате h:m:s</p>
        <input type="text" value={inputTime} onChange={handleInputChange} />
        <button onClick={handleSetTime}>Установить время</button>
      </div>
      <div>{formatTime(time)}</div>
      <div>{isRunning && <button onClick={handleStop}>Стоп</button>}</div>
    </div>
  );
};

export default App;
